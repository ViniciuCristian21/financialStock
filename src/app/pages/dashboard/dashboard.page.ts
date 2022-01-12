import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  hasAdmin: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  async logoutUser() {
    await this.loginService.logout();
  }

}
