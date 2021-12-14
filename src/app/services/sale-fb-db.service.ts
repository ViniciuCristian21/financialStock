import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore';
import { db } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaleFbDbService {
  userCollectionRef = collection(db, "sales");
  sales: any = [];
  constructor() { }


  async insertData(sale: any,){

     await sale.forEach(doc => {
      try {
        addDoc(this.userCollectionRef, {
          id: doc.id,
          name: doc.name,
          quantitie_sale: doc.quantitie_sale,
          type: doc.type,
          unitary_value: doc.unitary_value,
          date: doc.date
        });
      } catch (err) {
        console.log(err)
      }
    });

  }

  async getAllData() {
    const snap = await getDocs(this.userCollectionRef);

    this.sales = [];
    snap.forEach(doc => {
      this.sales.push({
        id: doc.data().id,
        date: doc.data().date,
        name: doc.data().name,
        quantitie_sale: doc.data().quantitie_sale,
        type: doc.data().type,
        unitary_value: doc.data().unitary_value
      })
    });

    return this.sales;

  }
}
