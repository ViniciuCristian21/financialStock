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
  totalUnitaryM: number = 0;
  totalBaseValueM: number = 0;
  totalUnitaryD: number = 0;
  totalBaseValueD: number = 0;
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
      this.totalUnitaryD = this.totalUnitaryD + total;
    })

    result.forEach(data => {
      let total = data.base_value * data.quantitie_sale;

      this.totalBaseValueD = this.totalBaseValueD + total;
    })
    const total = this.totalUnitaryD - this.totalBaseValueD;
    this.totalDay = Math.round(total);

  }

  filterProfitMonth() {
    const newDate = new Date()
    const month = newDate.getMonth()

    const result = this.defaultProfit.filter(doc => doc.no_format_date.toDate().getMonth() === month);

    result.forEach(data => {
      let total = data.unitary_value * data.quantitie_sale;
      this.totalUnitaryM = this.totalUnitaryM + total;
    })

    result.forEach(data => {
      let total = data.base_value * data.quantitie_sale;
      this.totalBaseValueM = this.totalBaseValueM + total;
    })

    // console.log(this.totalBaseValue)
    const total  = this.totalUnitaryM - this.totalBaseValueM;

    this.totalMonth = Math.round(total);
  }



}
