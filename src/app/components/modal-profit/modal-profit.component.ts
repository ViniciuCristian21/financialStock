import { SaleFbDbService } from './../../services/sale-fb-db.service';
import { ModalProfitService } from './../../services/modal-profit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-profit',
  templateUrl: './modal-profit.component.html',
  styleUrls: ['./modal-profit.component.scss'],
})
export class ModalProfitComponent implements OnInit {
  isOption: string = "";
  defaultProfit: any[] = [];
  totalDay: number = 0;
  totalMonth: number = 0;
  constructor(private modalProfitService: ModalProfitService,
              private saleDBFBService: SaleFbDbService) { }

  ngOnInit() {
    this.getAllProfit();
  }

  segmentChanged(ev: any) {
    this.isOption = ev.target.value;
    // console.log(ev.target.value)

    this.clicked();
  }

  modalBack() {
    this.modalProfitService.dismiss();
  }

  Option = {
    today() {
      // console.log("diario");
    },
    weekly() {
      // console.log("semanal");
    },
    monthly() {
      // console.log("mensal");
    }
  }

  clicked() {
    const move = this.Option[this.isOption];

    if (move) {
      move();
    }
  }

  async getAllProfit() {
    this.defaultProfit = await this.saleDBFBService.getAllData();

    this.filterProfitDay();
    this.filterProfitMonth();

  }

  filterProfitDay() {
    const newDate = new Date()
    const day = newDate.getDate()


    const result = this.defaultProfit.filter(doc => doc.no_format_date.toDate().getDate() === day);

    result.forEach(data => {
      let total = data.unitary_value * data.quantitie_sale;
      this.totalDay = this.totalDay + total;
    })
  }

  filterProfitMonth() {
    const newDate = new Date()
    const month = newDate.getMonth()

    const result = this.defaultProfit.filter(doc => doc.no_format_date.toDate().getMonth() === month);

    result.forEach(data => {
      let total = data.unitary_value * data.quantitie_sale;
      this.totalMonth = this.totalMonth + total;
    })
  }

}
