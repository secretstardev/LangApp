import { Component, EventEmitter, Output, TrackByFunction } from '@angular/core';
import { HomeNextButton, HomeNextButtonEnum } from './home-next-list.model';
import { homeNextListButtons } from '@app/libs/pages/home/components/home-next-list/home-next-list.config';

@Component({
  selector: 'app-home-next-list',
  templateUrl: './home-next-list.component.html',
  styleUrls: ['./home-next-list.component.scss'],
})
export class HomeNextListComponent {
  buttons = homeNextListButtons;

  @Output() clickHomeNextButton = new EventEmitter<HomeNextButtonEnum>();

  trackByFn: TrackByFunction<HomeNextButton> = (index, item) => item.id;

  homeBtnClick(button: HomeNextButton): void {
    this.clickHomeNextButton.emit(button.id);
  }
}
