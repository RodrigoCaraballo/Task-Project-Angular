import { Component, OnInit, ViewChild } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SharedMainLoginService } from '../utils/main-login.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss']
})
export class MainLoginComponent implements OnInit {

  currentView: string = 'view1';

  constructor(
    private readonly sharedMainLoginService: SharedMainLoginService
  ) {}

  ngOnInit(): void {
    this.sharedMainLoginService.currentMainLogin.subscribe(view => this.currentView = view);
  }

}
