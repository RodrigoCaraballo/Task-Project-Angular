import { Component, OnInit } from '@angular/core';
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
export class SignUpComponent implements OnInit {

  showError = false;
  showOk = false;
  errorStatus?: number;
  firabaseStatus?: string;
  loadingMsg: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly sharedMainLoginService: SharedMainLoginService,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signUpGoogleUseCase: SignUpGoogleUseCase,
    private readonly fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.sharedMainLoginService.getSpinner.subscribe(spinner => {this.loadingMsg = spinner})
  }

  signUpForm = this.fb.group({
    username: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^.{4,}$')] }),
    email: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+")]}),
    password: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'),] })
  })

  signInUser(): void {
    if(this.signUpForm.valid) {
      this.sharedMainLoginService.changeSpinnerValue(true);
      this.signUpUseCase.execute(this.signUpForm.getRawValue())
      .subscribe({
        next: value => {
          if (value) {
            this.sharedMainLoginService.changeSpinnerValue(false);
            localStorage.setItem('token', value)
            this.showOk = true
            setTimeout(() => {
              this.router.navigate(['/tasks']);
            }, 1500)
          }
        },
        error: () => {
          this.sharedMainLoginService.changeSpinnerValue(false);
        }
      })
    }
    if(this.signUpForm.invalid) {
      this.showError = true;
      console.log(this.signUpForm.get('password')?.errors);

      setTimeout(() => {
        this.showError = false;
      }, 3000)
    }
  }

  signInGoogle(): void {
    this.sharedMainLoginService.changeSpinnerValue(true);
    this.signUpGoogleUseCase.execute()
      .subscribe({
        next: value => {
          if (value) {
            this.sharedMainLoginService.changeSpinnerValue(false);
            localStorage.setItem('token', value)
            this.showOk = true
            setTimeout(() => {
              this.router.navigate(['/tasks']);
            }, 1500)
          }
        },
        error: () => {
          this.sharedMainLoginService.changeSpinnerValue(false);
        }
      })
  }

  changeComponent(): void {
    this.sharedMainLoginService.changeSpinnerValue(false);
    this.sharedMainLoginService.changeMainLoginComponent('view1')
  }
}
