import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  initAuthListener() {

    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }

  createUser(name: string, email: string, password: string) {
    //console.log(nombre, email, password);
    let dateCreate = new Date();
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(
          user?.uid ? user?.uid : '',
          name,
          user?.email ? user?.email : '',
          dateCreate
        );
        return this.firestore.doc(`${user?.uid}/user`)
          .set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbuser => fbuser != null)
    );
  }
}
