import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IconComponent } from '@app/libs/shared';
import { CustomDialogHeaderComponent } from '@app/libs/features/custom-dialog-header/custom-dialog-header.component';

@Component({
  selector: 'app-material-report',
  standalone: true,
  imports: [CommonModule, TranslateModule, InputTextareaModule, ButtonModule, ReactiveFormsModule, IconComponent, CustomDialogHeaderComponent],
  templateUrl: './material-report.component.html',
  styleUrls: ['./material-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MaterialReportComponent implements OnInit {

  reportReason = new FormControl<string>(null, [Validators.required]);

  constructor(public ref: DynamicDialogRef,
              private messageService: MessageService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  sendReport(): void {
    if (this.reportReason.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('FORM_ERROR'),
        detail: this.translateService.instant('FILL_REASON'),
        sticky: true,
        closable: true,
      });
      return;
    }
    this.ref.close(this.reportReason.value);
  }
}
