import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { IconType } from './icon.model';
import { DomSanitizer } from '@angular/platform-browser';

export type CustomIconType = 'folder-gradient' | 'access-denied' | 'not-found';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class IconComponent {
  @Input() icon?: IconType | CustomIconType;
  @Input() size: 'big' | 'normal' | 'small' | 'custom' = 'normal';

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon('folder-gradient', this.sanitizer.bypassSecurityTrustResourceUrl('assets/custom-icons/gradient-folder.svg'));
    this.iconRegistry.addSvgIcon('access-denied', this.sanitizer.bypassSecurityTrustResourceUrl('assets/custom-icons/access-denied.svg'));
    this.iconRegistry.addSvgIcon('not-found', this.sanitizer.bypassSecurityTrustResourceUrl('assets/custom-icons/not-found.svg'));
  }
}
