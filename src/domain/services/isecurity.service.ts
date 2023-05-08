import { Observable } from "rxjs";
import { SignUpRequest } from "../interfaces/request";

export interface ISecurityService {
  signIn(uid: string): Observable<string>;
  signUp(data: SignUpRequest): Observable<string>;
}
