import { Injectable } from "@angular/core";
import { ISecurityService, IUserModel, SignUpRequest } from '../../domain/';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TokenResponse } from "../../domain/interfaces/responses";

@Injectable()
export class SecurityService implements ISecurityService {
  url: string = 'http://localhost:3000'
  controller: string = 'security'

  private userLogged = new BehaviorSubject<TokenResponse | undefined>(undefined);
  currentLoggedUser = this.userLogged.asObservable();

  constructor(
    private readonly http: HttpClient
  ) {}

  signIn(uid: string): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/sign-in/${uid}`, null, {responseType: 'text'})
  }
  signUp(data: SignUpRequest): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/sign-up`, data, {responseType: 'text'})
  }

  setToken(token: TokenResponse): void {
    this.userLogged.next(token);
  }

  logout(): void {
    this.userLogged.next(undefined);
  }
}
