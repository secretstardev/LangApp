import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDialogHeaderComponent } from '@app/libs/features/custom-dialog-header/custom-dialog-header.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent, IconType } from '@app/libs/shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, CustomDialogHeaderComponent, TranslateModule, ButtonModule, IconComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent {
  @HostBinding('class.typography') enableTypography = true;

  acceptVisible = true;
  denyVisible = true;

  acceptLabel = 'Yes';
  denyLabel = 'No';

  title = 'Confirmation';
  icon: IconType = 'danger';
  message: string;

  constructor(public ref: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig) {
    this.title = this.dialogConfig.data?.['title'] ?? this.title;
    this.message = this.dialogConfig.data?.['message'];
    this.icon = this.dialogConfig.data?.['icon'] ?? this.icon;

    this.acceptVisible = this.dialogConfig.data?.['acceptVisible'] ?? this.acceptVisible;
    this.denyVisible = this.dialogConfig.data?.['denyVisible'] ?? this.denyVisible;
    this.acceptLabel = this.dialogConfig.data?.['acceptLabel'] ?? this.acceptLabel;
    this.denyLabel = this.dialogConfig.data?.['denyLabel'] ?? this.denyLabel;
  }

  confirm(value?: boolean): void {
    this.ref.close(value);
  }
}
