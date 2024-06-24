import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { CustomIconType, IconComponent, IconType } from '../../icon';

export type AppMenuItem = MenuItem & { icon: IconType | CustomIconType };

@Component({
  selector: 'app-buttons-menu',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule, IconComponent],
  templateUrl: './buttons-menu.component.html',
  styleUrls: ['./buttons-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsMenuComponent {
  @HostBinding('class.typography') enableTypography = true;

  @Output() copyTo = new EventEmitter();
  @Output() importWords = new EventEmitter();

  items: AppMenuItem[] = [
    {
      label: 'Copy to',
      icon: 'copy',
      command: () => {
        this.copyTo.emit();
      },
    },
    {
      label: 'Import words',
      icon: 'import words',
      command: () => {
        this.importWords.emit();
      },
    },
  ];
}
