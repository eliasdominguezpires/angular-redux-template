import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComunServicesService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  postFirestore(ingresoEgreso: IngresoEgreso) {

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  deleteFirestore(uidItem: string, url: string) {
    const userUid = this.authService.user?.uid;
    return this.firestore.doc(`${userUid}${url}${uidItem}`)
      .delete();
  }

  ingresosEgresosListener(uid: string) {
    // Optiene solo el valor
    /*this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .valueChanges()
      .subscribe(result => {
        console.log(result);

      });*/

    /*optener ID
    this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc =>{
          //const data:any = doc.payload.doc.data();
           return {
             uid: doc.payload.doc.id,
             ...doc.payload.doc.data() as any
           }
        });
      })
    )
    .subscribe(result => {
      console.log(result);
    });*/

    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        }))
        )
      );
  }
}
