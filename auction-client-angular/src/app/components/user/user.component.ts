import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User;

  constructor(private userService:UserService, private auth:LoginService) { }

  ngOnInit() {
    this.user =  this.auth.getUserData();
  }

  isManager() {
    return this.user.roles.find(r => r.role == "ROLE_MANAGER");
  }

  isAdmin() {
    console.log(this.user.roles);
    return this.user.roles.find(r => r.role == "ROLE_ADMIN");
  }

  changeName() {

  }

  changePassword() {

  }

}
