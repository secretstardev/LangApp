import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from '@app/libs/pages/contact/contact-page/contact-page.component';

const contactRoutes: Routes = [
  {
    path: '',
    component: ContactPageComponent,
    data: {
      breadcrumb: 'Contacts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {}
