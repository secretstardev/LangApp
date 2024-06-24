import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Content } from '@app/interfaces/common.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconComponent } from '@app/libs/shared';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MaterialsListCard } from '@app/libs/pages/content/components/materials-list-page/materials-list-page.model';
import { LocalizedTitlePipe } from '@app/libs/features/materials/pipes/localized-title-pipe.pipe';
import { routingConfig } from '@app/libs/config';

export const LOCALIZED_TITLE_VALUE = 'localized';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-materials-list-item',
  templateUrl: './materials-list-item.component.html',
  styleUrls: ['./materials-list-item.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    IconComponent,
    SkeletonModule,
    TranslateModule,
    LocalizedTitlePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMaterialsComponent implements OnInit, OnDestroy {
  readonly localizedTitleValue = LOCALIZED_TITLE_VALUE;
  isMobile = false;

  routerLink: string;
  data: Content;

  @Input() set item(value: Content) {
    this.data = value;
    if (this.data) {
      this.routerLink = `${routingConfig.content.materials.fullPath}/${this.data.id}`;
    }
  }

  @Input()
  public config: MaterialsListCard[];

  @Output()
  public removeItem: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public locale: string;

  @HostBinding('class.typography') enableTypography = true;

  constructor(public router: Router,
    public api: ApiService,
    public cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 640px)'
    ]).pipe(untilDestroyed(this)).subscribe((result: BreakpointState) => {
      this.isMobile = result.matches;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
  }

  buttonAction(actionName: string): void {
    switch (actionName) {
      case 'goToVideo':
        this.navigateToVideo();
        break;
      case 'removeFromFeed':
        this.removeFromFeed();
        break;
    }
  }

  navigateToVideo(): void {
    this.data?.id && this.router.navigate([this.routerLink]);
  }

  removeFromFeed(): void {
    this.data?.id && this.removeItem.emit(this.data.id);
  }

  showRating(item: Content) {
    return item.dataJson?.youtubeVideo?.viewCount + ' views' + (item.dataJson?.youtubeVideo?.wilsonScore ?
      ', ' + Math.floor(item.dataJson?.youtubeVideo?.wilsonScore * 100) + '% liked' :
      '');
  }
}
