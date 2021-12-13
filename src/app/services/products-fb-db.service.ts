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

  getDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }

  async insertData(products: Products){
    const { name, type, base_value, unitary_value, description } = products;
    const date = this.getDate();
    try {
      await addDoc(this.userCollectionRef, {
        name: name,
        type: type,
        base_value: base_value,
        unitary_value: unitary_value,
        description: description,
        date: date
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
          description: data.data().description,
          date: data.data().date
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
            base_value: data.data().base_value,
            unitary_value: data.data().unitary_value,
            description: data.data().description,
            date: data.data().date
          })
          return
        }
      })
    } catch (error) {
      console.log(error)
    }
    return this.products;
  }

  async updateData(product: Products, id: string) {
    const pDoc = doc(this.userCollectionRef, id)
    const { name, type, base_value, unitary_value, description } = product;
    const newProduct = {
      name: name,
      type: type,
      base_value: base_value,
      unitary_value: unitary_value,
      description: description
    }
    await updateDoc(pDoc, newProduct)
  }
  async delDoc(id: string) {
    const pDoc = doc(this.userCollectionRef, id);

    await deleteDoc(pDoc);
  }
}
