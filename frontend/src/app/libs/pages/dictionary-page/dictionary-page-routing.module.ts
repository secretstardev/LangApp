import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryPageComponent } from './dictionary-page/dictionary-page.component';
import { DictionaryListPageComponent } from './dictionary-list-page/dictionary-list-page.component';
import { DictionaryFormPageComponent } from './dictionary-form-page/dictionary-form-page.component';
import { routingConfig } from '@app/libs/config';

const routes: Routes = [
  {
    path: '',
    component: DictionaryListPageComponent,
  },
  {
    path: routingConfig.dictionary.create.path,
    component: DictionaryFormPageComponent,
  },
  {
    path: routingConfig.dictionary.dictionary.path,
    component: DictionaryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
