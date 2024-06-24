import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterLinkWithHref } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { DropdownItem, IconComponent } from '@app/libs/shared';
import { Content } from '@app/interfaces/common.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { routingConfig } from '@app/libs/config';
import { PaginatorModule } from 'primeng/paginator';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MaterialReportComponent } from '@app/libs/features/material';
import { Base64EncodePipe } from '@app/libs/features/material/pipes';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { ContentAttributeUpdate } from '@app/libs/core/models/features/content/content-attribute-update.model';
import { ContentStudied } from '@app/libs/core/models';

@UntilDestroy()
@Component({
  selector: 'app-material-info',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChipModule, DialogModule, InputTextareaModule, RouterLinkWithHref, SharedModule, TranslateModule, IconModule, IconComponent, PaginatorModule, Base64EncodePipe],
  templateUrl: './material-info.component.html',
  styleUrls: ['./material-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MaterialInfoComponent {
  @HostBinding('class.typography') enableTypography = true;

  @Input()
  content: Content;

  @Output()
  submitReport: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  updateAttribute: EventEmitter<ContentAttributeUpdate> = new EventEmitter<ContentAttributeUpdate>();

  MATERIALS_ROUTE = routingConfig.content.materials.fullPath;

  dialogRef: DynamicDialogRef | undefined;
  _languageLevels: Record<string, string> = {};
  protected readonly ContentStudied = ContentStudied;

  @Input() set languageLevels(levels: DropdownItem[]) {
    levels.map((level) => {
      this._languageLevels[level.value as string] = level.label;
    });
  }


  constructor(public customDialogService: CustomDialogService, private translateService: TranslateService) {
  }

  openReport(): void {
    this.dialogRef = this.customDialogService.open(MaterialReportComponent, {
      data: {
        title: this.translateService.instant('Material.View.Report'),
        titleSize: 'normal',
        contentPadding: '24px',
        breakpoints: { '1024px': '50vw', '300px': '100vw' },
      },
      dismissableMask: true,
      modal: true,
      showHeader: false,
      styleClass: 'material-report',
    });
    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.submitReport.emit(result);
      }
    });
  }
}
