import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent, MessageWithImageComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingCardKanjiComponent, TrainingCardWordComponent, TrainingCardWordExampleComponent, TrainingCardWordUseInComponent } from '../../components';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RequestDataStatusPipe } from '@app/libs/shared/components/table/utils/request-data-status.pipe';
import { TrainingShowMoreDialogStore } from './training-show-more-dialog.store';
import { TrainingStore } from '@app/libs/core/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AudioService } from '@app/libs/core/services';

@UntilDestroy({})
@Component({
  selector: 'app-training-show-more-dialog-container',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    IconComponent,
    TranslateModule,
    TrainingCardWordExampleComponent,
    TrainingCardWordUseInComponent,
    TrainingCardWordComponent,
    AutoSizeVirtualScrollStrategy,
    MessageWithImageComponent,
    ProgressSpinnerModule,
    RequestDataStatusPipe,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    TrainingCardKanjiComponent,
  ],
  templateUrl: './training-show-more-dialog-container.component.html',
  styleUrls: ['./training-show-more-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TrainingShowMoreDialogStore],
})
export class TrainingShowMoreDialogContainerComponent {
  @HostBinding('class.typography') enableTypography = true;

  constructor(
    private ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    public dialogStore: TrainingShowMoreDialogStore,
    private trainingStore: TrainingStore,
    private audioService: AudioService
  ) {
    if (!this.dialogConfig.data.card) {
      this.clickCancel();
    }
    this.dialogStore.setCard(this.dialogConfig.data.card);
  }

  clickCancel() {
    const currentIndex = this.dialogStore.prevCard();
    if (!currentIndex) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.ref.close();
  }

  clickPlay(url: string) {
    this.audioService.play(url);
  }

  clickMore(cardId: string) {
    this.trainingStore
      .getCardById(cardId)
      .pipe(untilDestroyed(this))
      .subscribe((card) => {
        this.dialogStore.setCard(card);
      });
  }
}
