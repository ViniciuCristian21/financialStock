import { Router } from '@angular/router';
import { SaleFbDbService } from './../../services/sale-fb-db.service';
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
              private productsFBDBService: ProductsFbDbService,
              private saleFBDB: SaleFbDbService,
              private router: Router) { }

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
        id: data.id,
        pId: this.pID,
        name: data.name,
        type: data.type,
        unitary_value: data.unitary_value,
        quantitieSale: quantities,
        date: data.date
      })
    });
    this.currentValue = this.dataView[this.dataView.length - 1].quantitieSale * this.dataView[this.dataView.length - 1].unitary_value;
    this.totalValue = this.totalValue + this.currentValue;
    console.log(this.dataView)
    // console.log(this.totalValue)
  }

  async saveSales() {
    const dataFinally = [];
    this.dataView.forEach(doc => {
      dataFinally.push({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        unitary_value: doc.unitary_value,
        quantitie_sale: doc.quantitieSale,
        date: doc.date
      })
    });
    console.log(dataFinally)
    await this.saleFBDB.insertData(dataFinally);
    this.router.navigate(['/dashboard/'])
  }
}
