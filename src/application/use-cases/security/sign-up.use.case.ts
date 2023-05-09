import { Injectable } from "@angular/core";
import { SecurityService, FirebaseService } from "../../../application/services";
import { Observable, catchError, from, map, switchMap } from "rxjs";
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
