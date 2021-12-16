import { Component, OnInit } from '@angular/core';
import { ModalSalesService } from 'src/app/services/modal-sales.service';

@Component({
  selector: 'app-modal-sales',
  templateUrl: './modal-sales.component.html',
  styleUrls: ['./modal-sales.component.scss'],
})
export class ModalSalesComponent implements OnInit {
  isOption: string = "";
  constructor(private modalSaleService: ModalSalesService) { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.isOption = ev.target.value;
    // console.log(ev.target.value)
  }

  modalBack() {
    this.modalSaleService.dismiss();
  }

}
