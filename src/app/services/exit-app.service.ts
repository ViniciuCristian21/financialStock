import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExitAppService {

  constructor(private platform: Platform,
              private router: Router,
              private navController: NavController) { }

  execute() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const currentUrl = this.router.url;
      if (currentUrl === "/home") {
        navigator['app'].exitApp();
      } else {
        this.navController.back();
      }
    });
  }
}
