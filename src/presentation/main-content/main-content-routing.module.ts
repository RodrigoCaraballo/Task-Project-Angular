import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', title: 'Task Menu', component: MainComponent },
      { path: '**', redirectTo: ''}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class MainContentRoutingModule { }
