import { Injectable } from "@angular/core";
import { ISecurityService, SignUpRequest } from '../../domain/';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SecurityService implements ISecurityService {
  url: string = 'http://localhost:3000'
  controller: string = 'security'

  constructor(
    private readonly http: HttpClient
  ) {}

  signIn(uid: string): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/sign-in/${uid}`, null, {responseType: 'text'})
  }
  signUp(data: SignUpRequest): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/sign-up`, data, {responseType: 'text'})
  }
}
