import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedMainLoginService } from '../utils/main-login.service';
import { SignUpGoogleUseCase, SignUpUseCase } from '../../../application/use-cases';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  showError = false;
  showOk = false;
  errorStatus?: number;
  firabaseStatus?: string;

  constructor(
    private readonly router: Router,
    private readonly sharedMainLoginService: SharedMainLoginService,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signUpGoogleUseCase: SignUpGoogleUseCase,
    private readonly fb: FormBuilder
  ) { }

  signUpForm = this.fb.group({
    username: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^.{4,}$')] }),
    email: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")] }),
    password: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'),] })
  })

  signInUser(): void {
    if(this.signUpForm.valid) {
      this.signUpUseCase.execute(this.signUpForm.getRawValue())
      .subscribe(value => {
        if (value) {
          localStorage.setItem('token', value)
          this.showOk = true
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1500)
        }
        if (!value) console.log(value);
      })
    }
    if(this.signUpForm.invalid) {
      this.showError = true;
      console.log(this.signUpForm.get('password')?.errors);

      setTimeout(() => {
        this.showError = false;
      }, 3000)
      return;
    }
  }

  signInGoogle(): void {
    this.signUpGoogleUseCase.execute()
      .subscribe(value => {
        if (value) {
          localStorage.setItem('token', value)
          this.showOk = true
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1500)
        }
        if (!value) console.log(value);
      })
  }

  changeComponent(): void {
    this.sharedMainLoginService.changeMainLoginComponent('view1')
  }
}
