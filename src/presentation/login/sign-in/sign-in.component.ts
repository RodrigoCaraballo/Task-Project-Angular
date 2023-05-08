import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedMainLoginService } from '../utils/main-login.service';
import { SignInGoogleUseCase, SignInUseCase } from '../../../application/use-cases';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  showError = false;
  showOk = false;
  errorStatus?: number;
  firabaseStatus?: string;

  constructor(
    private readonly router: Router,
    private readonly sharedMainLoginService: SharedMainLoginService,
    private readonly signInUseCase: SignInUseCase,
    private readonly signInGoogleUseCase: SignInGoogleUseCase,
    private readonly fb: FormBuilder
  ) { }

  signInForm = this.fb.group({
    email: this.fb.nonNullable.control('',
      { validators: [Validators.required] }),
    password: this.fb.nonNullable.control('',
      { validators: [Validators.required] })
  })

  signInUser(): void {
    if(this.signInForm.valid) {
      this.signInUseCase.execute(this.signInForm.getRawValue())
      .subscribe({
        next: (value) => {
          if (value) {
            localStorage.setItem('token', value);
            this.showOk = true

            setTimeout(() => {
              this.router.navigate(['/tasks']);
            }, 1500)
          }
          if (!value) console.log(value);
        },
        error: (error: FirebaseError) => {
          this.showError = true;
          this.firabaseStatus = error.code
          setTimeout(() => {
            this.showError = false;
          }, 3000)
        }
      });
    }
    if(this.signInForm.invalid) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000)
    }
  }

  signInGoogle(): void {
    this.signInGoogleUseCase.execute()
    .subscribe(value => {
      if(value) {
        localStorage.setItem('token', value)
        this.router.navigate(['/tasks']);
      }
      if(!value) console.log(value);
    })
  }

  changeComponent(): void {
    this.sharedMainLoginService.changeMainLoginComponent('view2')
  }
}
