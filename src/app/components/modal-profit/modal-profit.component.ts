import { ModalProfitService } from './../../services/modal-profit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-profit',
  templateUrl: './modal-profit.component.html',
  styleUrls: ['./modal-profit.component.scss'],
})
export class ModalProfitComponent implements OnInit {
  isOption: string = "";
  constructor(private modalProfitService: ModalProfitService) { }

  ngOnInit() {}

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

}
