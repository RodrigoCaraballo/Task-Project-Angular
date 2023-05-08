import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, from, map, of, switchMap } from "rxjs";
import jwt_decode from 'jwt-decode';
import { TokenResponse } from "../../../domain/interfaces/responses";
import { FirabaseLoginRequest } from "../../../domain";

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
                const decodedToken = jwt_decode<TokenResponse>(token);
                this.securityService.setToken(decodedToken);
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
