import { Injectable } from "@angular/core";
import { FirebaseService } from "../../../application/services";
import { Observable, from, map } from "rxjs";

@Injectable()
export class SignOutUseCase {
  constructor(
    private readonly firebaseService: FirebaseService
  ) { }

  execute(): Observable<boolean> {
    return from(this.firebaseService.signOut())
    .pipe(
      map(() => {
        localStorage.removeItem('token')
        return true;
      })
    )
  }
}
