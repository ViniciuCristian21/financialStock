import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSalesService {
  arrSales: any = [];
  constructor() { }

  id: string;
  quantities: number;

  finish(){
    this.arrSales.push({
      id: this.id,
      quantities: this.quantities
    })
    // console.log(this.arrSales[this.arrSales.length - 1])
    // console.log(this.arrSales)
  }
}
