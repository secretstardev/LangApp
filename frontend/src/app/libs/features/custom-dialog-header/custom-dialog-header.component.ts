import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconType } from '@app/libs/shared';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-dialog-header',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './custom-dialog-header.component.html',
  styleUrls: ['./custom-dialog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CustomDialogHeaderComponent implements OnInit {

  @Input()
  ref: DynamicDialogRef;

  @Input()
  title: string;

  @Input()
  closable = true;

  @Input()
  icon: IconType;

  @Input()
  titleSize: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
