import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginRoutingModule } from './login-routing.module';
import { MainLoginComponent } from './main-login/main-login.component';
import { SharedMainLoginService } from './utils/main-login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusFirabasePipe } from './utils';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MainLoginComponent,
    StatusFirabasePipe
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [SharedMainLoginService]
})
export class LoginModule { }
