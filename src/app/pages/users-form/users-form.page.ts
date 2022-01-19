import { LoginService } from './../../services/login.service';
import { Users } from './../../entities/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
})
export class UsersFormPage implements OnInit {
  title: string = '';
  uId: string = '';
  users: Users;
  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService) {}

  ngOnInit() {
    this.uId = this.activatedRoute.snapshot.params['id'];

    this.title = this.uId === undefined ? "Novo Usuario" : "Editar Usuario";

    if (this.uId) {
      this.getUserById();
    }

    this.users = new Users();
  }

  getUserById() {
  }

  async onSubmit() {
    if (this.uId) {
      try {
        // Update user
        console.log("Update")
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
        this.loginService.registerUser(this.users)
        console.log('Insert')
      } catch (err) {
        console.log(err.message)
      }
    }
  }

}
