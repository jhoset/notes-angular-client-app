import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {RegisterViewComponent} from "./views/register-view/register-view.component";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginViewComponent
      },
      {
        path: 'register',
        component: RegisterViewComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
