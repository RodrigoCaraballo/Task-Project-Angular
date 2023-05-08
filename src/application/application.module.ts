import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { SecurityService, FirebaseService } from './services';
import { TaskService } from './services/task.service';
import { SignInGoogleUseCase, SignInUseCase, SignUpGoogleUseCase, SignUpUseCase } from './use-cases';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [SecurityService, FirebaseService, TaskService, SignInUseCase, SignInGoogleUseCase, SignUpUseCase, SignUpGoogleUseCase]
})
export class ApplicationModule { }
