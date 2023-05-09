import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, filter, from, map, of, switchMap } from "rxjs";
import jwt_decode from 'jwt-decode';
import { TokenResponse } from "../../../domain/interfaces/responses";
import { CreateUserRequest, FirabaseLoginRequest, SignUpRequest } from "../../../domain";
import { signInWithPopup } from '@angular/fire/auth';

@Injectable()
export class SignUpGoogleUseCase {
  constructor(
    private readonly securityService: SecurityService,
    private readonly firebaseService: FirebaseService
  ) { }

  execute(): Observable<string> {
    return from(this.firebaseService.loginWithGoogle())
      .pipe(
        switchMap(value => {
          let username: string;
          if(value.user.email) username = value.user.email.split('@')[0] + '_' + Math.floor(Math.random() * 900 + 100)
          else username = 'Guest' + '_' + Math.floor(Math.random() * 900 + 100);

          const user: SignUpRequest = {
            uid: value.user.uid,
            username: username
          }
          return this.securityService.signUp(user)
            .pipe(
              map((token: string) => {
                return token;
              }),
              catchError(() => {
                throw new Error('Error')
              })
            )
        })
      )
  }
}
