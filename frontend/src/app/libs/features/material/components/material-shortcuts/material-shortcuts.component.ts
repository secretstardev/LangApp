import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { Shortcut } from '@app/libs/core/models/features/materials/material-view.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IconComponent } from '@app/libs/shared';
import { CustomDialogHeaderComponent } from '@app/libs/features/custom-dialog-header/custom-dialog-header.component';

@Component({
  selector: 'app-material-shortcuts',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, TranslateModule, IconComponent, CustomDialogHeaderComponent],
  templateUrl: './material-shortcuts.component.html',
  styleUrls: ['./material-shortcuts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MaterialShortcutsComponent {

  @Input()
  shortcuts: Shortcut[];
  constructor(private dialogConfig: DynamicDialogConfig) {
    this.shortcuts = this.dialogConfig.data?.['shortcuts'];
  }
}
