import { SaleFbDbService } from './../../services/sale-fb-db.service';
import { Component, OnInit } from '@angular/core';
import { ModalSalesService } from 'src/app/services/modal-sales.service';

@Component({
  selector: 'app-modal-sales',
  templateUrl: './modal-sales.component.html',
  styleUrls: ['./modal-sales.component.scss'],
})
export class ModalSalesComponent implements OnInit {
  isOption: string = "";
  defaultSale: any = [];
  date: Date;
  qtdSaleDay: number;
  qtdSaleMonth: number;
  constructor(private modalSaleService: ModalSalesService,
              private saleDBFBService: SaleFbDbService) { }

  ngOnInit() {
    this.getSale();
  }

  segmentChanged(ev: any) {
    this.isOption = ev.target.value;
    console.log(ev.target.value)
    // this.clicked();
  }

  modalBack() {
    this.modalSaleService.dismiss();
  }

  Option = {
    today() {
      console.log("diario");
    },
    weekly() {
      console.log("semanal");
    },
    monthly() {
      console.log("mensal");
    }
  }

  clicked() {
    const move = this.Option[this.isOption];

    if (move) {
      move();
    }
  }

  async getSale() {
    this.defaultSale = await this.saleDBFBService.getAllData();

    // console.log(this.defaultSale)
    this.filterSalesDay()
    this.filterSalesMonth()
  }

  filterSalesDay() {
    const newDate = new Date()
    const day = newDate.getDate()

    const result = this.defaultSale.filter(doc => doc.no_format_date.toDate().getDate() === day);

    this.qtdSaleDay = result.length;
  }

  filterSalesMonth() {
    const newDate = new Date()
    const month = newDate.getMonth()

    const result = this.defaultSale.filter(doc => doc.no_format_date.toDate().getMonth() === month);

    this.qtdSaleMonth = result.length;

  }

}
