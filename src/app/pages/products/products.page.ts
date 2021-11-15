import { ProductsFbDbService } from './../../services/products-fb-db.service';
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
  products: any = [];
  constructor(private  modalProductsAddService: ModalProductsAddService,
              private dataSalesService: DataSalesService,
              private productsFBDBService: ProductsFbDbService) { }

  ngOnInit() {
    // this.products = new Products();
    this.getAll();
  }
  async openQuantities(id: string){
    await this.modalProductsAddService.presentQunatitiesProduct();
    this.dataSalesService.id = id;
  }

  async getAll(){
    this.products = await this.productsFBDBService.getAll();
    // console.log(this.products)
  }
  ionViewWillEnter(){
    this.getAll();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getAll()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
