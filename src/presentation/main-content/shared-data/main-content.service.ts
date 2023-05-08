import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SharedMainContentService {
  private formActivate = new BehaviorSubject<boolean>(false)
  nowIsActivate = this.formActivate.asObservable();

  constructor() { }

  changeActivateState(value: boolean): void {
    this.formActivate.next(value)
  }
}
