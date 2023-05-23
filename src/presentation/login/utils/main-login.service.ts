import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SharedMainLoginService {
  private switchMainLogin = new BehaviorSubject<string>('view1')
  currentMainLogin = this.switchMainLogin.asObservable();

  private spinner = new BehaviorSubject<boolean>(false);
  getSpinner = this.spinner.asObservable();

  constructor() { }

  changeMainLoginComponent(view: string): void {
    this.switchMainLogin.next(view)
  }

  changeSpinnerValue(value: boolean): void {
    this.spinner.next(value)
  }
}
