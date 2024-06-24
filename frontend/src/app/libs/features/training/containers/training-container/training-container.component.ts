import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingStore } from '@app/libs/core/store';
import {
  TrainingCardKanjiComponent,
  TrainingCardQuestionComponent,
  TrainingCardQuestionPuzzleComponent,
  TrainingCardWordComponent,
  TrainingCompleteComponent,
  TrainingCompleteWhatNextType,
  TrainingFooterComponent,
  TrainingToolbarComponent,
} from '../../components';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { routingConfig } from '@app/libs/config';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TrainingHideQuestionDialogContainerComponent } from '../training-hide-question-dialog-container/training-hide-question-dialog-container.component';
import { TrainingSettingsDialogContainerComponent } from '../training-settings-dialog-container/training-settings-dialog-container.component';
import { DictionaryList, DrillCard, TrainingCardType, TrainingQuestionCard } from '@app/libs/core/models';
import { AudioService } from '@app/libs/core/services';
import { TrainingShowMoreDialogContainerComponent } from '../training-show-more-dialog-container/training-show-more-dialog-container.component';
import { TrainingFooterAvailabilityPipe } from './pipes/training-footer-availability.pipe';
import { ButtonModule } from 'primeng/button';

@UntilDestroy()
@Component({
  selector: 'app-training-container',
  standalone: true,
  imports: [
    CommonModule,
    TrainingToolbarComponent,
    TrainingCardKanjiComponent,
    ProgressSpinnerModule,
    TrainingFooterComponent,
    TrainingCompleteComponent,
    DynamicDialogModule,
    TrainingCardQuestionComponent,
    TrainingCardWordComponent,
    TrainingFooterAvailabilityPipe,
    TrainingCardQuestionPuzzleComponent,
    ButtonModule,
    TranslateModule,
  ],
  templateUrl: './training-container.component.html',
  styleUrls: ['./training-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class TrainingContainerComponent implements OnDestroy {
  @HostBinding('class.typography') enableTypography = true;

  constructor(public trainingStore: TrainingStore, private router: Router, private dialogService: DialogService, private translate: TranslateService, private audioService: AudioService) {}

  ngOnDestroy() {
    this.trainingStore.endDrill();
  }

  completeLinkClick(type: TrainingCompleteWhatNextType) {
    switch (type) {
      case 'StudyMore':
        void this.router.navigate([routingConfig.content.materials.fullPath]);
    }
  }

  selectDictionary(event: DictionaryList) {}

  hideQuestion(card: DrillCard) {
    const ref = this.dialogService.open(TrainingHideQuestionDialogContainerComponent, {
      header: this.translate.instant('HideQuestion.Title'),
      data: {
        isAudioQuestion: !!(card as TrainingQuestionCard)?.question?.isAudioQuestion,
      },
    });
  }

  openSetting() {
    const ref = this.dialogService.open(TrainingSettingsDialogContainerComponent, {
      header: this.translate.instant('StudySettings.Title'),
    });
  }

  clickWordMore(cardId: string): void {
    this.trainingStore
      .getCardById(cardId)
      .pipe(untilDestroyed(this))
      .subscribe((card) => {
        this.dialogService.open(TrainingShowMoreDialogContainerComponent, {
          data: {
            card,
          },
          closable: false,
          showHeader: false,
        });
      });
  }

  navigateToNextCard() {}

  clickPlay(url: string) {
    this.audioService.play(url);
  }

  nextQuestion() {
    this.trainingStore.nextDrill();
  }

  checkWithoutAnswer(runNext = true, audioUrl?: string) {
    this.trainingStore
      .answerDrill(null)
      .pipe(untilDestroyed(this))
      .subscribe((resp) => {
        if (audioUrl) {
          this.audioService.play(audioUrl);
        }
        if (runNext) {
          this.nextQuestion();
        }
      });
  }

  checkIndexAnswer(index: number, card: TrainingQuestionCard): void {
    this.trainingStore
      .answerDrill(card.question.answers[index]?.isCorrectAnswer || false)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.audioService.play(card.audioUrls?.[0]);
      });
  }

  checkButtonsAnswer(answer: string, card: TrainingQuestionCard): void {
    this.trainingStore
      .answerDrill(card.question.correctAnswers.indexOf(answer) !== -1 || false)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.audioService.play(card.audioUrls?.[0]);
      });
  }

  disableAudioQuestion(event: string) {
    this.trainingStore
      .disableAudioQuestionsFor1Hour(event as TrainingCardType)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
