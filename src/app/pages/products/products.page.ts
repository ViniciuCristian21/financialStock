import { DataSalesService } from './../../services/data-sales.service';
import { ModalProductsAddService } from './../../services/modal-products-add.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  saleId: string = "12b";
  constructor(private  modalProductsAddService: ModalProductsAddService,
              private dataSalesService: DataSalesService) { }

  ngOnInit() {
  }
  async openQuantities(){
    await this.modalProductsAddService.presentQunatitiesProduct();
    this.dataSalesService.id = this.saleId;
  }

}
