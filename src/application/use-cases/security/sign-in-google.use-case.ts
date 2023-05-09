import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, from, map, switchMap } from "rxjs";

@Injectable()
export class SignInGoogleUseCase {
  constructor(
    private readonly securityService: SecurityService,
    private readonly firebaseService: FirebaseService
  ) { }

  execute(): Observable<string> {
    return from(this.firebaseService.loginWithGoogle())
      .pipe(
        switchMap(value => {
          return this.securityService.signIn(value.user.uid)
            .pipe(
              map((token: string) => {
                return token;
              }),
              catchError(() => {
                throw new Error('Error');
              })
            )
        })
      )
  }
}
