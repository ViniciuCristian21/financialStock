import { ExitAppService } from './../../services/exit-app.service';
import { Login } from './../../entities/login';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login
  constructor(private loginService: LoginService,
              private exitAppService: ExitAppService) { }

  ngOnInit() {
    this.login = new Login();
  }


  async loginUser() {
    await this.loginService.login(this.login);

    // console.log(this.login)
  }

  exitApp() {
    this.exitAppService.execute();
  }

}
