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
  isSearch: boolean = false;
  search: string = '';
  filterProducts: any[] = [];
  atSale: boolean;
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

  openSearch() {
    this.isSearch = true;
  }

  closeSearch() {
    this.isSearch = false;
    this.search = "";
    this.filterProducts = [];
  }

  executeFilter() {
    let lowCaseData  = this.search.toLocaleLowerCase();

    const allData = this.products;

    this.filterProducts = allData.filter(doc => doc.name.toLocaleLowerCase() === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,1) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,2) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,3) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,4) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,5) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,6) === lowCaseData ||
                                                doc.name.toLocaleLowerCase().substr(0,7) === lowCaseData)

    // console.log(this.filterProducts)

  }

}
