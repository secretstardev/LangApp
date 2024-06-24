import { DrillCard } from '@app/libs/core/models';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TrainingApiService } from '@app/libs/core/services';

export interface TrainingStoreModel {
  cards: DrillCard[];
}

const storeKey = 'training-show-more-dialog';

@Injectable()
export class TrainingShowMoreDialogStore {
  private store = createStore({ name: storeKey }, withProps<TrainingStoreModel>({ cards: [] }));
  constructor(private trainingApiService: TrainingApiService) {}

  setCard(card: DrillCard) {
    this.store.update(setProp('cards', [...this.store.getValue().cards, card]));
  }

  prevCard(): number {
    this.store.update(setProp('cards', this.store.getValue().cards.slice(0, -1)));
    return this.store.getValue().cards.length;
  }

  currentCard$ = this.store.pipe(
    select((state) => state.cards),
    map((pages) => pages[pages.length - 1])
  );
}
