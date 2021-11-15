import { Products } from './../entities/products';
import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore';
import { db } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsFbDbService {
  userCollectionRef = collection(db, "products");
  products: any = [];
  constructor() {}


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

  async getAll(){
    try {
      const snap = await getDocs(this.userCollectionRef);
      this.products = [];
      snap.forEach((data) => {
        this.products.push({
          id: data.id,
          name: data.data().name,
          type: data.data().type,
          quantitie: data.data().quantitie,
          base_value: data.data().base_value,
          unitary_value: data.data().unitary_value,
          description: data.data().description
        })
      })
    } catch (error) {
      console.log(error)
    }
    return this.products;

  }

  async getById(pId: string) {
    try {
      const snap = await getDocs(this.userCollectionRef);
      this.products = [];
      snap.forEach((data) => {
        if (data.id == pId) {
          this.products.push({
            id: data.id,
            name: data.data().name,
            type: data.data().type,
            quantitie: data.data().quantitie,
            base_value: data.data().base_value,
            unitary_value: data.data().unitary_value,
            description: data.data().description
          })
          return
        }
      })
    } catch (error) {
      console.log(error)
    }
    return this.products;
  }
}
