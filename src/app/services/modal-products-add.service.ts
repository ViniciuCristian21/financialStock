import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QtdProductsComponent } from '../components/qtd-products/qtd-products.component';

@Injectable({
  providedIn: 'root'
})
export class ModalProductsAddService {

  constructor(public modalController: ModalController) { }

  async presentQunatitiesProduct() {
    const modal = await this.modalController.create({
      component: QtdProductsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
