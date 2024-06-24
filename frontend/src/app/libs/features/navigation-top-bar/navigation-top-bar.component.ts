import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@app/libs/shared';
import { HeaderVisibilityService } from '@app/libs/core/services/features/header-visibility';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NavigationStateService } from '@app/libs/core/services/common/navigation-state-service.service';

@UntilDestroy()
@Component({
  selector: 'app-navigation-top-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './navigation-top-bar.component.html',
  styleUrls: ['./navigation-top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTopBarComponent implements OnInit, OnDestroy {

  @Input()
  pageTitle: string;

  public isVisible = false;
  private _hasPreviousRoute = false;

  constructor(private router: Router,
              private navigationStateService: NavigationStateService,
              private cdr: ChangeDetectorRef,
              private headerVisibilityService: HeaderVisibilityService,
              private breakPointObserver: BreakpointObserver) {
    this._hasPreviousRoute = !!this.router.getCurrentNavigation().previousNavigation;
  }

  ngOnInit(): void {
    this.breakPointObserver
        .observe([
          Breakpoints.Handset,
          Breakpoints.TabletPortrait])
        .pipe(
          map(result => result.matches),
          untilDestroyed(this))
        .subscribe(isMobile => {
          this.isVisible = isMobile;
          this.headerVisibilityService.setShowHeader(!this.isVisible);
          this.cdr.detectChanges();
        });
  }

  ngOnDestroy() {
    this.headerVisibilityService.setShowHeader(true);
  }

  goBack(): void {
    this.navigationStateService.goBack(this._hasPreviousRoute);
  }
}
