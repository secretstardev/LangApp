import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { SharedModule } from '@app/shared/shared.module';
import { DropdownComponent, DropdownItem, IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterExpansionEvent, FiltersConfig } from '@app/libs/features/materials/filters/filters.model';
import { FiltersComponent } from '@app/libs/features/materials/filters/filters.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { SubPageComponent } from '@app/libs/features/materials/filter-panel/sub-page/sub-page.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    SharedModule,
    IconComponent,
    TranslateModule,
    ReactiveFormsModule,
    FiltersComponent,
    OverlayPanelModule,
    PanelModule,
    DialogModule,
    SubPageComponent,
    DropdownComponent,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilterPanelComponent implements OnInit {
  @ViewChild('filters') filters: FiltersComponent;
  @ViewChild('SideBar') sidebar: Sidebar;

  @HostBinding('class.typography') enableTypography = true;

  @Input()
  config: FiltersConfig;

  @Input()
  availableValues: Record<string, Observable<DropdownItem[]>>;

  @Input()
  mobileWrap: boolean;

  _isVisible = false;
  _isSubPanelVisible = false;
  _isMobile = false;
  _expandedData: FilterExpansionEvent;

  constructor(private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
        .observe(['(max-width: 768px)', '(max-height: 900px)'])
        .pipe(untilDestroyed(this))
        .subscribe(result => {
          this._isMobile = result.matches;
          this.cdr.detectChanges();
        });
  }

  onControlExpanded(evt: FilterExpansionEvent): void {
    if (evt.field.isExpandable && this._isMobile) {
      this._expandedData = evt;
      this.toggleSubPanel();
    }
  }

  togglePanel(): void {
    this._isVisible = !this._isVisible;
    !this._isVisible && this.sidebar.destroyModal();
  }

  toggleSubPanel() {
    this._isSubPanelVisible = !this._isSubPanelVisible;
  }

  updateVisibility(): void {
    this._isVisible = !this._isVisible;
    this.cdr.detectChanges();
  }
}
