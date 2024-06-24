import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '@app/interfaces/common.interface';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RouterLinkWithHref } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { VideojsComponent } from '@app/libs/features/videojs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MaterialInfoComponent, MaterialRecommendationsListComponent, MaterialVideoComponent } from '@app/libs/features/material/components';
import { DropdownItem } from '@app/libs/shared';
import { ContentAttributeUpdate } from '@app/libs/core/models/features/content/content-attribute-update.model';

@Component({
  selector: 'app-material-view',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    IconModule,
    InputSwitchModule,
    InputTextareaModule,
    OverlayPanelModule,
    RouterLinkWithHref,
    SharedModule,
    SharedModule,
    TableModule,
    TranslateModule,
    VideojsComponent,
    ProgressSpinnerModule,
    MaterialVideoComponent,
    MaterialInfoComponent,
    MaterialRecommendationsListComponent,
  ],
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss'],
})
export class MaterialViewComponent implements OnInit {
  @Input()
  content: Content;

  @Input()
  languageLevels: DropdownItem[];

  @Output()
  removeFromFeed: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  submitReport: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  updateAttribute: EventEmitter<ContentAttributeUpdate> = new EventEmitter<ContentAttributeUpdate>();

  constructor() {}

  ngOnInit(): void {}
}
