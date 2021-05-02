import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map,take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Details {
  id?: string;
  name: string;
  age: string;
  gender:string ;
  description:string;
}
 

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private details: Observable<Details[]>;
  private detailsCollection: AngularFirestoreCollection<Details>;
  

  constructor(private afs: AngularFirestore) {
    this.detailsCollection = this.afs.collection<Details>('details');
 
    this.details = this.detailsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getDetails(id:string) : Observable<Details[]>{
    return this.details;
  }
  
  getDetail(id: string): Observable<Details> {
    return this.detailsCollection.doc<Details>(id).valueChanges().pipe(
      take(1),
      map(details => {
        details.id = id;
        return details
      })
    );
  }
 
  addDetail(details: Details): Promise<DocumentReference> {
    return this.detailsCollection.add(details);
  }
 


}