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
       const no_format_date = new Date();
       const day =  no_format_date.getDate();
       const month = no_format_date.getMonth() + 1;
       const year = no_format_date.getFullYear();
       const format_date = day + '/' + month + '/' + year;
      try {
        addDoc(this.userCollectionRef, {
          id: doc.id,
          name: doc.name,
          quantitie_sale: doc.quantitie_sale,
          type: doc.type,
          unitary_value: doc.unitary_value,
          format_date: format_date,
          base_value: doc.base_value,
          no_format_date: no_format_date
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
        format_date: doc.data().format_date,
        name: doc.data().name,
        quantitie_sale: doc.data().quantitie_sale,
        type: doc.data().type,
        unitary_value: doc.data().unitary_value,
        no_format_date: doc.data().no_format_date,
        base_value: doc.data().base_value
      })
    });

    return this.sales;

  }
}
