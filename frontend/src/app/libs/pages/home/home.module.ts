import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeNextListComponent } from './components/home-next-list/home-next-list.component';
import { ButtonNextComponent, DateLocaleComponent, MessageInfoComponent } from '@app/libs/shared/components';
import { StatsCalendarComponent, TimelineComponent, UserStatsInfoComponent } from '@app/libs/features/user-stats';
import { HomeStudyMessageBoxComponent } from './components/home-study-message-box/home-study-message-box.component';
import { PenaltyAmountPipe } from '@app/libs/features/user';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [HomeComponent, HomeNextListComponent, HomeStudyMessageBoxComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        TranslateModule.forChild(),
        ButtonNextComponent,
        MessageInfoComponent,
        TimelineComponent,
        StatsCalendarComponent,
        UserStatsInfoComponent,
        DateLocaleComponent,
        PenaltyAmountPipe,
        SkeletonModule,
    ],
})
export class HomeModule {}
