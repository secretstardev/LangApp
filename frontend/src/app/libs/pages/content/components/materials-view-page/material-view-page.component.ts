import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EventsService } from '@app/services/events.service';

@UntilDestroy()
@Component({
  selector: 'app-content-view',
  templateUrl: './material-view-page.component.html',
  styleUrls: ['./material-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialViewPageComponent implements OnInit, OnDestroy {
  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.hideNavBar.emit(true);
  }

  ngOnDestroy() {
    this.eventsService.hideNavBar.emit(false);
  }
}
