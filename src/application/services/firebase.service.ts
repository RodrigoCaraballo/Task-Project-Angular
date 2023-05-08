import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { FirabaseLoginRequest } from '../../domain';

@Injectable()
export class FirebaseService {
  constructor(
    private auth: Auth
  ) {}

  register(data: FirabaseLoginRequest) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password);
  }

  login(data: FirabaseLoginRequest) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    return signOut(this.auth);
  }

}
