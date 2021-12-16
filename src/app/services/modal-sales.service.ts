import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalSalesComponent } from '../components/modal-sales/modal-sales.component';
@Injectable({
  providedIn: 'root'
})
export class ModalSalesService {

  constructor(public modalController: ModalController) { }

  async presentAccountingSales() {
    const modal = await this.modalController.create({
      component: ModalSalesComponent,
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
