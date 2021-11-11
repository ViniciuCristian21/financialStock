import { Products } from './../entities/products';
import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore';
import { db } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsFbDbService {
  userCollectionRef = collection(db, "products");
  constructor() { }


  async insertData(products: Products){
    const { name, type, quantitie, base_value, unitary_value, description } = products;
    try {
      await addDoc(this.userCollectionRef, {
        name: name,
        type: type,
        quantitie: quantitie,
        base_value: base_value,
        unitary_value: unitary_value,
        description: description
      });
    } catch (error) {
      console.log(error)
    }
  }
}
