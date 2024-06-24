import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentComponent } from '@app/libs/pages/content/content.component';
import { CreateMaterialsPageComponent } from '@app/libs/pages/content/components/create-materials-page/create-materials-page.component';
import { EditMaterialsPageComponent } from '@app/libs/pages/content/components/edit-materials-page/edit-materials-page.component';
import {
  MaterialViewPageComponent
} from '@app/libs/pages/content/components/materials-view-page/material-view-page.component';
import { MaterialsListPageComponent } from '@app/libs/pages/content/components/materials-list-page/materials-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    data: {
      breadcrumb: 'Materials',
    },
    children: [
      {
        path: '',
        redirectTo: 'materials',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateMaterialsPageComponent,
        data: {
          breadcrumb: 'Create material',
        },
      },
      {
        path: 'edit/:id',
        component: EditMaterialsPageComponent,
        data: {
          breadcrumb: 'Edit material',
        },
      },
      {
        path: 'materials/:id',
        component: MaterialViewPageComponent,
        data: {
          breadcrumb: 'View material',
        },
      },
      {
        path: 'materials',
        component: MaterialsListPageComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
