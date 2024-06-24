import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { Drill, DrillCard, TrainingCardType, TrainingEndMessage } from '@app/libs/core/models';
import { Injectable } from '@angular/core';
import { TrainingApiService } from '@app/libs/core/services';
import { tap } from 'rxjs/operators';
import { joinRequestResult, trackRequestResult } from '@app/libs/core/store/common/lib-fix/request-result';
import { map, Observable, of } from 'rxjs';
import { getTypeGuard, makeTypeGuard } from '@app/libs/core/store/common';

export interface TrainingStoreModel {
  cards: Map<string, DrillCard>;
  drills?: Drill[];
  drillsFilled: Map<string, Drill>;
  currentDrillCardId?: string;
  allDrillsComplete: boolean;
}

const storeKey = 'training';

const store = createStore({ name: storeKey }, withProps<TrainingStoreModel>({ drillsFilled: new Map(), cards: new Map(), allDrillsComplete: false }));

makeTypeGuard(storeKey, 'retrieveList');

const actions = {
  retrieveList: getTypeGuard(storeKey, 'retrieveList'),
};

@Injectable({
  providedIn: 'root',
})
export class TrainingStore {
  constructor(private trainingApiService: TrainingApiService) {}

  retrieveList() {
    return this.trainingApiService.getOne().pipe(
      tap((result) => {
        store.update(
          setProp('cards', new Map(Object.entries(result.cards))),
          setProp('drills', result.drills),
          setProp('drillsFilled', new Map(result.drills.map((el) => [el.card, el]))),
          setProp('currentDrillCardId', undefined)
        );
      }),
      trackRequestResult([actions.retrieveList], { skipCache: true })
    );
  }

  getCardById(id: string): Observable<DrillCard> {
    const cards = store.getValue().cards;
    if (cards && cards.has(id)) {
      return of(cards.get(id));
    }
    return this.trainingApiService.getTrainingCard(id).pipe(
      tap((card) => {
        const newCards = new Map(cards);
        newCards.set(card.cardId, card);
        store.update(setProp('cards', newCards));
      })
    );
  }

  drills$ = store.pipe(
    select((state) => state.drills),
    joinRequestResult([actions.retrieveList])
  );

  currentDrill$ = store
    .combine({
      drills: store.pipe(select((state) => state.drillsFilled)),
      currentDrillCardId: store.pipe(select((state) => state.currentDrillCardId)),
    })
    .pipe(map(({ drills, currentDrillCardId }) => drills.get(currentDrillCardId)));

  cards$ = store.pipe(
    select((state) => state.cards),
    joinRequestResult([actions.retrieveList])
  );

  currentCard$: Observable<DrillCard> = store
    .combine({
      cards: store.pipe(select((state) => state.cards)),
      currentDrillCardId: store.pipe(select((state) => state.currentDrillCardId)),
    })
    .pipe(map(({ cards, currentDrillCardId }) => cards.get(currentDrillCardId)));

  completedDrills$ = this.drills$.pipe(map((resp) => (resp?.data || []).filter((el) => el.isFinished)));

  nextDrill(): void {
    const drillsFilled = store.getValue().drillsFilled;
    const unfinishedDrill = Array.from(drillsFilled.values()).find((el) => !el.isFinished);
    if (unfinishedDrill) {
      this.fillDrill({ card: unfinishedDrill.card, answerStartTime: Date.now() });
      store.update(setProp('currentDrillCardId', unfinishedDrill.card));
    } else {
      store.update(setProp('allDrillsComplete', true));
    }
  }

  answerDrill(isAnsweredCorrectly: boolean): Observable<TrainingEndMessage> {
    const dateNow = Date.now();
    const currentDrills = store.getValue().drillsFilled;
    const currentCard = currentDrills.get(store.getValue().currentDrillCardId);

    currentDrills.set(store.getValue().currentDrillCardId, {
      ...currentCard,
      isAnsweredCorrectly,
      answerEndTime: dateNow,
      answerDuration: dateNow - currentCard.answerStartTime,
      isFinished: true,
    });

    return this.trainingApiService.reportTrainingDrills({ drills: Array.from(currentDrills.values()) }).pipe(
      tap(() => {
        store.update(setProp('drillsFilled', new Map(currentDrills)));
      })
    );
  }

  disableAudioQuestionsFor1Hour(cardType: TrainingCardType): Observable<void> {
    const currentDrills = store.getValue().drillsFilled;

    return this.trainingApiService
      .saveTrainingHidings({
        cardToHide: cardType,
        mode: 'disableAudioQuestionsFor1Hour',
        drills: Array.from(currentDrills.values()),
      })
      .pipe(
        map(({ drills }) => {
          store.update(setProp('drills', drills)), setProp('drillsFilled', new Map(drills.map((el) => [el.card, el])));
        })
      );
  }

  endDrill(): void {
    store.update(setProp('cards', new Map()), setProp('drills', []), setProp('drillsFilled', new Map()), setProp('currentDrillCardId', undefined));
  }

  fillDrill(drill: Partial<Drill> & { card: string }): void {
    const drillsFilled = store.getValue().drillsFilled;
    drillsFilled.set(drill.card, { ...drillsFilled.get(drill.card), ...drill });
    store.update(setProp('drillsFilled', drillsFilled));
  }
}
