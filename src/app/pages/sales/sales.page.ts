import { ProductsFbDbService } from './../../services/products-fb-db.service';
import { DataSalesService } from './../../services/data-sales.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  dataAll: any = [];
  dataView: any = [];
  pID: number = 0;
  totalValue: number = 0;
  currentValue: number = 0;
  constructor(private dataSalesService: DataSalesService,
              private productsFBDBService: ProductsFbDbService) { }

  ngOnInit() {
    this.isData();
  }

  isData() {
    const isDataSale = this.dataSalesService.arrSales.length == 0 ? true : false;
    if (isDataSale == false) {
      this.getDataSale();
    } else {
      return
    }
  }
  ionViewWillEnter(){
    this.isData();
  }

  async getDataSale() {
    const id = this.dataSalesService.id;
    const quantities = this.dataSalesService.quantities;
    this.dataSalesService.arrSales = [];
    this.pID = this.pID + 1;
    this.dataAll = await this.productsFBDBService.getById(id);
    this.dataAll.forEach(data => {
      this.dataView.push({
        id: this.pID,
        name: data.name,
        type: data.type,
        unitary_value: data.unitary_value,
        quantitieSale: quantities,
      })
    });
    this.currentValue = this.dataView[this.dataView.length - 1].quantitieSale * this.dataView[this.dataView.length - 1].unitary_value;
    this.totalValue = this.currentValue + this.dataView[this.dataView.length - 1].unitary_value;
    console.log(this.dataView)
    console.log(this.totalValue)
  }
}
