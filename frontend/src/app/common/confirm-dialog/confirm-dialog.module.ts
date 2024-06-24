import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ConfirmDialogComponent],
    exports: [ConfirmDialogComponent],
    imports: [MatButtonModule, MatDialogModule, TranslateModule]
})
export class ConfirmDialogModule {}
