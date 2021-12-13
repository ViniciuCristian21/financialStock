import { ProductsFbDbService } from './../../services/products-fb-db.service';
import { Products } from './../../entities/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastGlobalService } from 'src/app/services/toast-global.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.page.html',
  styleUrls: ['./products-form.page.scss'],
})
export class ProductsFormPage implements OnInit {
  products: Products;
  pId: string = "";
  getByIdProducts: any = [];
  title: string = "";
  constructor(private productsFBDBService: ProductsFbDbService,
              private router: Router,
              private toastGlobalService: ToastGlobalService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.products = new Products();
    this.pId = this.activatedRoute.snapshot.params['id'];
    this.getById();

    if (this.pId) {
      this.title = "Editar Produto";
    }else {
      this.title = "Novo Produto";
    }
  }

  async getById() {
    if (this.pId) {
      const result  = await this.productsFBDBService.getById(this.pId);
      console.log(result)
      const { name, type, base_value, unitary_value, description } = result[0];

      this.products.name = name == undefined ? "" : name;
      this.products.type = type == undefined ? "" : type;
      this.products.base_value = base_value == undefined ? "" : base_value;
      this.products.unitary_value = unitary_value == undefined ? "" : unitary_value;
      this.products.description = description == undefined ? "" : description;
    }
  }

  async saveProducts(){
    if (this.pId) {
      try {
        await this.productsFBDBService.updateData(this.products, this.pId)
        this.router.navigate(['/products'])
        this.toastGlobalService.presentToast("success", 'Atualizado Com Sucesso');
      } catch (error) {

      }
    }else{
      if (this.products.name === undefined ||
        this.products.type === undefined ||
        this.products.base_value === undefined ||
        this.products.unitary_value === undefined)
    {
      return
    }
    try {
      await this.productsFBDBService.insertData(this.products);
      this.toastGlobalService.presentToast("warning", "O produto foi armazenado com sucesso");
      this.router.navigate(['/products'])
      this.toastGlobalService.presentToast("success", 'Salvo Com Sucesso');
      this.products = undefined;
    } catch (error) {
      this.toastGlobalService.presentToast("Danger", `O produto não foi armazenado ${error}`);
      console.log(error)
    }
    }

  }

  async deleteDoc() {
    try {
      await this.productsFBDBService.delDoc(this.pId);
      this.router.navigate(['/products'])
      this.toastGlobalService.presentToast("danger", "Excluido Com Sucesso");
    } catch (err) {
      this.toastGlobalService.presentToast("danger", `Erro: ${err}`);
    }
  }

}
