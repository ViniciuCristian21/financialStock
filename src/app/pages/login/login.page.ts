import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ExitAppService } from './../../services/exit-app.service';
import { Login } from './../../entities/login';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/entities/localStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login;
  userLocal: LocalStorage = new LocalStorage();
  listLocal: LocalStorage[] = [];
  constructor(private loginService: LoginService,
              private exitAppService: ExitAppService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.login = new Login();
  }


  async loginUser() {
    await this.loginService.login(this.login);

    // console.log(this.login)
    this.save();
  }

  exitApp() {
    this.exitAppService.execute();
  }

  async getAll() {
    try {
      this.listLocal = await this.localStorageService.getAll();
      const { email, state } = this.listLocal[0];
      if (state === true) {
        this.userLocal.email = email;
        this.login.email = email;
        this.userLocal.state = state;
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  ionViewDidEnter() {
    this.getAll();
  }

  async getKeys() {
    const result = await this.localStorageService.getKeys();

    return result[0]
  }

  async save() {
    this.userLocal.email = this.login.email;
    const email = await this.getKeys();
    if (email === this.userLocal.email) {
      try {
        await this.localStorageService.set(this.userLocal.email, this.userLocal)
      } catch (err) {
        console.log(err.message)
      }
    }else {
      await this.localStorageService.clearAll();

      try {
        await this.localStorageService.set(this.userLocal.email, this.userLocal)
      } catch (err) {
        console.log(err.message)
      }
    }
  }

}
