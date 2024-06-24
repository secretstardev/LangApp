import { NgModule } from '@angular/core';
import { SignupPageComponent } from '@app/libs/pages/auth/components/signup-page/signup-page.component';
import { SigninComponent } from '@app/libs/pages/auth/components/signin/signin.component';
import { RouterModule } from '@angular/router';
import { RestorePageComponent } from '@app/libs/pages/auth/components/restore-page/restore-page.component';
import { AuthComponent } from '@app/libs/pages/auth/auth.component';

const authRoutes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        component: SignupPageComponent,
        data: {
          breadcrumb: 'Sign up'
        }
      },
      {
        path: 'signin',
        component: SigninComponent,
        data: {
          breadcrumb: 'Sign in'
        }
      },
      {
        path: 'restore',
        component: RestorePageComponent,
        data: {
          breadcrumb: 'Restore password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
