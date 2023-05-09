import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { SecurityService, FirebaseService } from './services';
import { TaskService } from './services/task.service';
import { CreateTaskUseCase, DeleteOneTaskUseCase, GetTasksUseCase, SignInGoogleUseCase, SignInUseCase, SignOutUseCase, SignUpGoogleUseCase, SignUpUseCase, UpdateTaskUseCase } from './use-cases';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [SecurityService, FirebaseService, TaskService, SignInUseCase, SignInGoogleUseCase, SignUpUseCase, SignUpGoogleUseCase,
             CreateTaskUseCase, GetTasksUseCase, CreateTaskUseCase, UpdateTaskUseCase, SignOutUseCase, DeleteOneTaskUseCase]
})
export class ApplicationModule { }
