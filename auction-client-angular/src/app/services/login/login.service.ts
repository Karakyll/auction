import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from "@angular/common/http";
import { Cookie } from "ng2-cookies"
import { Router } from "@angular/router";
import {ConfigService} from "../config/config.service";
import {UserService} from "../user/user.service";
import { Token } from "../../models/token";
import {User} from "../../models/user";

@Injectable()
export class LoginService {

  private defaultToken: Token = {
    access_token: null,
    token_type: null,
    expires_in: 0,
    scope: null
  };

  private deafultUser: User = {
    userName: null,
    set_password: null,
    enabled: null,
    roles: null
  };

  constructor(private http:HttpClient, private router:Router, private api:ConfigService, private userService:UserService) {
  }

  obtainAccessToken(loginData) {

    const params = new HttpParams()
      .set('client_id', 'auctionClient')
      .append('client_secret', 'secret')
      .append('grant_type', 'password')
      .append('username', loginData.username)
      .append('password', loginData.password);

    this.http.post('http://localhost:8081/oauth/token', params, this.api.get_login_http_options())
      .subscribe(
        data => {
          this.saveToken(data);
          console.log("logout");
          console.log(this.getToken());
          this.logout();
        },
        err => {
          alert('Invalid Credentials');
        }
      );
  }

  saveToken(token) {
    console.log("in save");
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expires_at', JSON.stringify(expireDate));
    console.log("token");
    console.log(this.getToken());
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  checkToken() {
    return localStorage.getItem('token') != null;
  }

  logout() {
    this.saveToken(this.defaultToken);
  }

  isExpired() {
    return (this.getExpireIn() <= 0);
  }

  getExpireIn() {
    const expiration = localStorage.getItem('expires_at');
    return JSON.parse(expiration) - new Date().getTime();
  }



}
