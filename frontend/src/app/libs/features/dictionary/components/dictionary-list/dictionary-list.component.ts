import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestResult } from '@ngneat/elf-requests';
import { DictionaryList, DictionaryListType } from '@app/libs/core/models';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconComponent, MessageWithImageComponent } from '@app/libs/shared';
import { ButtonModule } from 'primeng/button';
import { TippyDirective } from '@ngneat/helipopper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DictionaryListEntityIconPipe } from '@app/libs/features/dictionary/components/dictionary-list/dictionary-list-entity-icon.pipe';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { ConfirmDialogComponent } from '@app/libs/features/confirm-dialog/confirm-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SkeletonModule } from 'primeng/skeleton';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-list',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    IconComponent,
    ButtonModule,
    TippyDirective,
    TranslateModule,
    ConfirmDialogModule,
    MessageWithImageComponent,
    DictionaryListEntityIconPipe,
    SkeletonModule,
  ],
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent {
  @HostBinding('class.typography') enableTypography = true;

  @Input() entities?: RequestResult & { data: DictionaryList[] };
  @Input() enabledRemove = true;
  @Input() selectable = false;
  @Input() selectedId?: number;

  @Output() entityClick = new EventEmitter<DictionaryList>();
  @Output() entityDelete = new EventEmitter<DictionaryList>();

  types = DictionaryListType;

  constructor(private confirmationService: ConfirmationService, private tr: TranslateService, private customDialogService: CustomDialogService) {}

  trackByFn: TrackByFunction<DictionaryList> = (index, item) => item.id;

  onEntityDelete(event: Event, entity: DictionaryList) {
    const ref = this.customDialogService.open(ConfirmDialogComponent, {
      data: {
        hideCustomHeader: true,
        contentPadding: '24px',
        breakpoints: { '500px': '438px', '300px': '100vw' },
        input: {
          message: this.tr.instant('DeleteListConfirm.Description'),
        },
      },
      modal: true,
      dismissableMask: false,
      showHeader: false,
      styleClass: 'confirm-dialog',
    });

    ref.onClose.pipe(untilDestroyed(this)).subscribe((result) => {
      if (result) {
        this.entityDelete.emit(entity);
      }
    });
  }
}
