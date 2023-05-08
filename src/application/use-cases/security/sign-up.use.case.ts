import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, from, map, of, switchMap } from "rxjs";
import jwt_decode from 'jwt-decode';
import { TokenResponse } from "../../../domain/interfaces/responses";
import { CreateUserRequest, FirabaseLoginRequest, SignUpRequest } from "../../../domain";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly securityService: SecurityService,
    private readonly firebaseService: FirebaseService
  ) { }

  execute(data: CreateUserRequest): Observable<string> {
    const firabaseUser: FirabaseLoginRequest = {
      email: data.email,
      password: data.password
    }
    return from(this.firebaseService.register(firabaseUser))
      .pipe(
        switchMap(value => {
          const user: SignUpRequest = {
            uid: value.user.uid,
            username: data.username
          }
          return this.securityService.signUp(user)
            .pipe(
              map((token: string) => {
                const decodedToken = jwt_decode<TokenResponse>(token);
                this.securityService.setToken(decodedToken);
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
