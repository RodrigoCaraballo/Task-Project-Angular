import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SharedMainLoginService {
  private switchMainLogin = new BehaviorSubject<string>('view1')
  currentMainLogin = this.switchMainLogin.asObservable();

  constructor() { }

  changeMainLoginComponent(view: string): void {
    this.switchMainLogin.next(view)
  }
}
