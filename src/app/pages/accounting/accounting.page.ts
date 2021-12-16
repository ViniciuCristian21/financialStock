import { ModalProfitService } from './../../services/modal-profit.service';
import { ModalSalesService } from './../../services/modal-sales.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  constructor(private modalSaleService: ModalSalesService,
              private modalProfitService: ModalProfitService) { }

  ngOnInit() {
  }

  getModalSales() {
    this.modalSaleService.presentAccountingSales()
  }

  getModalProfit() {
    this.modalProfitService.presentAccountingProfit();
  }

}
