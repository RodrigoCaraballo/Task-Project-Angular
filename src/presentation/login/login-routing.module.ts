import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainLoginComponent } from './main-login/main-login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', title: 'Login', component: MainLoginComponent },
      { path: '**', redirectTo: ''}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class LoginRoutingModule { }
