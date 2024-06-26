import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { TrainingQuestionCard } from '@app/interfaces/common.interface';
import editIcon from '@iconify/icons-mdi/edit';
import { CardsService, CurrentCardState } from '@app/training/cards/cards.service';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AudioService } from '@app/libs/core/services';

@UntilDestroy()
@Component({
  selector: 'app-type-furigana-whole-word',
  templateUrl: './type-furigana-whole-word.component.html',
  styleUrls: ['./type-furigana-whole-word.component.scss', '../drills-common-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class TypeFuriganaWholeWordComponent implements OnInit {
  card: TrainingQuestionCard;
  state: CurrentCardState;

  icons = {
    editIcon,
  };

  constructor(private cardsService: CardsService, private api: ApiService, private router: Router, private cd: ChangeDetectorRef, public audioService: AudioService) {}

  ngOnInit(): void {
    this.getTrainingDetails();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if ((event.code.startsWith('Digit') || event.code == 'Enter') && this.state.isAnswered) {
      this.continueTraining();
    }
  }

  onAnsweredChanged() {
    if (this.state.isAnswered) {
      this.audioService.play(this.card?.audioUrls?.[0]);
    }
  }

  forgotAnswer() {
    this.state.isAnswered = true;
    this.state.isAnsweredCorrectly = false;
    this.cardsService.answerCard(this.state.isAnsweredCorrectly);
    this.onAnsweredChanged();
  }

  continueTraining() {
    this.cardsService.navigateToNextCard();
  }

  getTrainingDetails() {
    this.cardsService.currentCardState$.pipe(untilDestroyed(this)).subscribe((state) => {
      this.state = state;
      this.card = <TrainingQuestionCard>state.card;
      this.cd.markForCheck();
    });
  }
}
