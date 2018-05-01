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
    private auth:LoginService,
    private router:Router
  ){}

  ngOnInit(){
  }

  login() {
    /*if (this.auth.loginUser(this.loginData)) {
      this.router.navigate(["/"]);
    } else {
      this.isFailed = true;
    }*/
    this.auth.test(this.loginData);
    this.router.navigate(["/"]);
  }

}
