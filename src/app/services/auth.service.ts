import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';

import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {

    this.auth.authState.subscribe(fuser => {
      //console.log(fuser);
      //console.log(fuser?.email);
      console.log(fuser?.uid);
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges()
          .subscribe((firestoreUser: any) => {
            //console.log({firestoreUser});
            const user = User.fromFirebase(firestoreUser)
            this.store.dispatch(setUser({ user }))

          });

      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(unSetUser());
      }
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
