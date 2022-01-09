import { ExitAppService } from './services/exit-app.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private exitApp: ExitAppService,
              private platform: Platform) {
                this.initializeApp();
              }

  initializeApp() {
    this.platform.ready().then(() => {
      this.exitApp.execute();
    })
  }
}
