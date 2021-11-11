import { ProductsFbDbService } from './../../services/products-fb-db.service';
import { Products } from './../../entities/products';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastGlobalService } from 'src/app/services/toast-global.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.page.html',
  styleUrls: ['./products-form.page.scss'],
})
export class ProductsFormPage implements OnInit {
  products: Products;
  constructor(private productsFBDBService: ProductsFbDbService,
              private router: Router,
              private toastGlobalService: ToastGlobalService) { }

  ngOnInit() {
    this.products = new Products();
  }

  async saveProducts(){
    try {
      await this.productsFBDBService.insertData(this.products);
      this.toastGlobalService.presentToast("warning", "O produto foi armazenado com sucesso");
      this.router.navigate(['/products'])
    } catch (error) {
      this.toastGlobalService.presentToast("Danger", `O produto não foi armazenado ${error}`);
      console.log(error)
    }
  }

}
