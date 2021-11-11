import { ModalProductsAddService } from './../../services/modal-products-add.service';
import { DataSalesService } from './../../services/data-sales.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qtd-products',
  templateUrl: './qtd-products.component.html',
  styleUrls: ['./qtd-products.component.scss'],
})
export class QtdProductsComponent implements OnInit {
  quantities: number;
  constructor(private dataSalesService: DataSalesService,
              private modalProductsAdd: ModalProductsAddService) { }

  ngOnInit() {}
  close(){
    this.modalProductsAdd.dismiss();
  }

  finish(){
    this.dataSalesService.quantities = this.quantities;

    this.dataSalesService.finish();
  }

}
