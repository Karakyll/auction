import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User;

  constructor(
    private interact:InteractionService,
    private userService:UserService,
    private auth:LoginService,
    private router:Router
  ) { }

  ngOnInit() {
    this.user =  this.auth.getUserData();
  }

  isManager() {
    return this.user.roles.find(r => r.role == "ROLE_MANAGER");
  }

  isAdmin() {
    return this.user.roles.find(r => r.role == "ROLE_ADMIN");
  }

  showAuctions() {
    this.interact.callUserAuctionsModal(this.user);
  }

  showBets() {
    this.interact.callUserBetsModal(this.user);
  }

  changePassword() {
    this.interact.callPasswordChangeModal(this.user);
  }

  deleteAccount() {
    this.interact.callDeleteAccountModal(this.user);
  }

  userAdministration() {
  }

}
