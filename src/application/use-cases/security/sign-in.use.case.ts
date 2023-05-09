import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, from, map, switchMap } from "rxjs";
import { FirabaseLoginRequest } from "../../../domain";

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly securityService: SecurityService,
    private readonly firebaseService: FirebaseService
  ) { }

  execute(data: FirabaseLoginRequest): Observable<string> {
    return from(this.firebaseService.login(data))
      .pipe(
        switchMap(value => {
          return this.securityService.signIn(value.user.uid)
            .pipe(
              map((token: string) => {
                return token;
              }),
              catchError(() => {
                throw new Error('Error')
              })
            )
        }),
      )
  }
}
