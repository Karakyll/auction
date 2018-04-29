import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {username: "", password: ""};
  isFailed:boolean = false;

  constructor(
    private loginService:LoginService,
    private router:Router
  ){}

  ngOnInit(){
  }

  login() {
    /*if (this.loginService.loginUser(this.loginData)) {
      this.router.navigate(["/"]);
    } else {
      this.isFailed = true;
    }*/
    this.loginService.test(this.loginData);
    this.router.navigate(["/"]);
  }

  logout() {
    this.loginService.logout();
  }

}
