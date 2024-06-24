import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  materialsCardPageConfig
} from '@app/libs/pages/content/components/materials-list-page/materials-list-page.config';
import { ListMaterialsComponent } from '@app/libs/features/material/components/list-item/materials-list-item.component';


@Component({
  selector: 'app-material-recommendations-list',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TranslateModule, ListMaterialsComponent, ListMaterialsComponent],
  templateUrl: './material-recommendations-list.component.html',
  styleUrls: ['./material-recommendations-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialRecommendationsListComponent {

  @Input()
  recommendations;

  @Output()
  removeFromFeed: EventEmitter<number> = new EventEmitter<number>();

  buttons = materialsCardPageConfig;

  constructor() {
  }
}
