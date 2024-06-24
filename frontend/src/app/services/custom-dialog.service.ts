import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from '@app/libs/features/dialog/components/dialog.component';
import { CustomDialogModel } from '@app/libs/core/models/features/dialog/dialog.model';
import { ConfirmDialogComponent } from '@app/libs/features/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {
  constructor(private dialogService: DialogService, private tr: TranslateService) {}

  open(componentType: Type<any>, config: DynamicDialogConfig<CustomDialogModel>): DynamicDialogRef {
    return this.dialogService.open(DialogComponent, {
      ...config,
      styleClass: `custom-dialog ${config.styleClass ?? ''}`,
      data: {
        ...config.data,
        componentType,
      },
    });
  }

  openDeleteDialog(message: string) {
    return this.open(ConfirmDialogComponent, {
      data: {
        hideCustomHeader: true,
        contentPadding: '24px',
        breakpoints: { '500px': '438px', '300px': '100vw' },
        input: {
          message: this.tr.instant(message),
        },
      },
      modal: true,
      dismissableMask: false,
      showHeader: false,
      styleClass: 'confirm-dialog',
    });
  }
}
