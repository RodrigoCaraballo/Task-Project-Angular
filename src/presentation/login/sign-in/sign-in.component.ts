import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedMainLoginService } from '../utils/main-login.service';
import { SignInGoogleUseCase, SignInUseCase } from '../../../application/use-cases';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseError } from '@angular/fire/app';
import { SharedMainContentService } from 'src/presentation/main-content/utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  showError = false;
  showOk = false;
  errorStatus?: number;
  firabaseStatus?: string;
  loadingMsg: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly sharedMainLoginService: SharedMainLoginService,
    private readonly signInUseCase: SignInUseCase,
    private readonly signInGoogleUseCase: SignInGoogleUseCase,
    private readonly fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.sharedMainLoginService.getSpinner.subscribe(spinner => {
      this.loadingMsg = spinner
    })
  }

  signInForm = this.fb.group({
    email: this.fb.nonNullable.control('',
      { validators: [Validators.required] }),
    password: this.fb.nonNullable.control('',
      { validators: [Validators.required] })
  })

  signInUser(): void {
    if(this.signInForm.valid) {
      this.sharedMainLoginService.changeSpinnerValue(true);
      this.signInUseCase.execute(this.signInForm.getRawValue())
      .subscribe({
        next: (value) => {
          this.sharedMainLoginService.changeSpinnerValue(false);
          if (value) {
            localStorage.setItem('token', value);
            this.showOk = true

            setTimeout(() => {
              this.router.navigate(['/tasks']);
            }, 1500)
          }
        },
        error: (error: FirebaseError) => {
          this.sharedMainLoginService.changeSpinnerValue(false);
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
    this.sharedMainLoginService.changeSpinnerValue(true);
    this.signInGoogleUseCase.execute()
    .subscribe({
      next: value => {
        this.sharedMainLoginService.changeSpinnerValue(false);
        if(value) {
          localStorage.setItem('token', value)
          this.router.navigate(['/tasks']);
        }
      },
      error: () => {
        this.sharedMainLoginService.changeSpinnerValue(false);
      }
    })
  }

  changeComponent(): void {
    this.sharedMainLoginService.changeSpinnerValue(false);
    this.sharedMainLoginService.changeMainLoginComponent('view2')
  }
}
