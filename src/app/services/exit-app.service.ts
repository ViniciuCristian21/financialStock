import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExitAppService {

  constructor(private platform: Platform,
              private router: Router,
              private navController: NavController,
              public alertController: AlertController) { }

  execute() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const currentUrl = this.router.url;
      if (currentUrl === "/dashboard") {
        this.presentAlertConfirm()
      } else {
        this.navController.back();
      }
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja sair do app?',
      message: 'Clique em "SAIR"',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sair',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
