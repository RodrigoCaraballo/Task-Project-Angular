import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MainComponent } from './main/main.component';
import { MainContentRoutingModule } from './main-content-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedMainContentService } from './utils';
import { TasksListsComponent } from './tasks-lists/tasks-lists.component';



@NgModule({
  declarations: [
    MainComponent,
    TaskFormComponent,
    TasksListsComponent,

  ],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    ReactiveFormsModule,

    //Required By Material DatePicker
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [SharedMainContentService,]
})
export class MainContentModule { }
