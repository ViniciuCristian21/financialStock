import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProfitComponent } from '../components/modal-profit/modal-profit.component';
@Injectable({
  providedIn: 'root'
})
export class ModalProfitService {

  constructor(public modalController: ModalController) { }

  async presentAccountingProfit() {
    const modal = await this.modalController.create({
      component: ModalProfitComponent,
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
