import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {username: "", password: ""};

  constructor(
    private loginService:LoginService){}

  ngOnInit(){
  }

  login() {
    this.loginService.obtainAccessToken(this.loginData);
  }

  logout() {
    this.loginService.logout();
  }

}
