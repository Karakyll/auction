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
  buttonLocked:boolean = false;

  constructor(
    private auth:LoginService,
    private router:Router
  ){}

  ngOnInit(){
  }

  login() {
    this.buttonLocked = true;
    if (this.auth.loginUser(this.loginData)) {
      console.log("in login comp. now redirect!");
      this.router.navigate(["/"]);
      this.buttonLocked = false;
    } else {
      this.isFailed = true;
      this.buttonLocked = false;
    }
  }

}
