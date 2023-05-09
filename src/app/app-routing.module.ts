import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, unLoggedGuard } from '../presentation/utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../presentation/login/login.module').then(m => m.LoginModule),
    canActivate: [unLoggedGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('../presentation/main-content/main-content.module').then(m => m.MainContentModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
