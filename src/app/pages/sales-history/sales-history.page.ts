import { SaleFbDbService } from './../../services/sale-fb-db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
})
export class SalesHistoryPage implements OnInit {

  constructor(private saleFBDB: SaleFbDbService) { }
  sales: any = [];
  newSales: any = [];
  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    try {
      this.sales = await this.saleFBDB.getAllData();
    } catch (err) {
      console.log(err)
    }
    this.formatData();
  }

  formatData() {
    this.sales.forEach(data => {
      const total = data.quantitie_sale * data.unitary_value;
      this.newSales.push({
        id: data.id,
        name: data.name,
        quantitie_sale: data.quantitie_sale,
        total: total,
        format_date: data.format_date
      })
    });

    // console.log(this.newSales)
  }

}
