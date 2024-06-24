import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ContentComponent } from '@app/libs/pages/content/content.component';
import { SharedModule } from '@app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SkeletonModule } from 'primeng/skeleton';
import { IconComponent, MessageWithImageComponent } from '@app/libs/shared';
import { ContentRoutingModule } from '@app/libs/pages/content/content-routing.module';
import {
  MaterialsListPageComponent
} from '@app/libs/pages/content/components/materials-list-page/materials-list-page.component';
import {
  CreateMaterialsPageComponent
} from '@app/libs/pages/content/components/create-materials-page/create-materials-page.component';
import {
  EditMaterialsPageComponent
} from '@app/libs/pages/content/components/edit-materials-page/edit-materials-page.component';
import { VideojsComponent } from '@app/libs/features/videojs';
import {
  MaterialViewPageComponent
} from '@app/libs/pages/content/components/materials-view-page/material-view-page.component';
import { FilterPanelComponent } from '@app/libs/features/materials/filter-panel/filter-panel.component';
import { FiltersComponent } from '@app/libs/features/materials/filters';
import { SearchFieldComponent } from '@app/libs/features/search-field/search-field.component';
import { MaterialViewContainerComponent } from '@app/libs/features/material';
import { DialogService } from 'primeng/dynamicdialog';
import { ListMaterialsComponent } from '@app/libs/features/material/components/list-item/materials-list-item.component';

@NgModule({
  declarations: [ContentComponent, MaterialsListPageComponent, CreateMaterialsPageComponent, EditMaterialsPageComponent, MaterialViewPageComponent],
    imports: [
        ContentRoutingModule,
        CommonModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        ListMaterialsComponent,
        SharedModule,
        DialogModule,
        RippleModule,
        OverlayPanelModule,
        InputSwitchModule,
        IconModule,
        MultiSelectModule,
        ScrollingModule,
        SkeletonModule,
        IconComponent,
        VideojsComponent,
        FilterPanelComponent,
        FiltersComponent,
        SearchFieldComponent,
        MaterialViewContainerComponent,
        MessageWithImageComponent,
    ],
  providers: [DialogService],
})
export class ContentModule {}
