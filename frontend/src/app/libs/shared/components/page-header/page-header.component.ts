import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '../icon';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface PageHeaderBreadcrumbLabel {
  id: number;
  label: string;
  editable: boolean;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, TranslateModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class PageHeaderComponent implements OnChanges {
  @Input() label = '';
  @Input() breadCrumbsLabels: PageHeaderBreadcrumbLabel[] = [];
  @Input() enablePrevButton = false;

  @Output() clickEdit = new EventEmitter<void>();

  private hasPreviousNavigation = false;

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    this.hasPreviousNavigation = !!this.router.getCurrentNavigation()?.previousNavigation;
  }

  ngOnChanges(changes: SimpleChanges) {}

  clickToPrevPage(): void {
    if (this.hasPreviousNavigation) {
      this.location.back();
    } else {
      void this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
  }
}
