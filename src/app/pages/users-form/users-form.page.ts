import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
})
export class UsersFormPage implements OnInit {
  hasId: string;
  title: string = "Usuario";
  constructor(private activatedRoute: ActivatedRoute,) {}

  ngOnInit() {
  }

}
