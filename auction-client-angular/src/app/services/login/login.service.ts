import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Token } from "../../models/token";
import { User } from "../../models/user";
import { Observable } from "rxjs/Observable";
import { Role } from "../../models/role";

@Injectable()
export class LoginService {

  private API_BASE_HREF = 'http://localhost:8081/api/';
  private HEADERS = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json'
    });

  private defaultToken: Token = {
    access_token: null,
    token_type: null,
    expires_in: 0,
    scope: null
  };
  private defaultUser: User = {
    userName: null,
    set_password: null,
    enabled: null,
    roles: null
  };

  constructor(private http:HttpClient, private router:Router) {
  }

  obtainAccessToken(loginData) {
    const params = new HttpParams()
      .set('client_id', 'auctionClient')
      .append('client_secret', 'secret')
      .append('grant_type', 'password')
      .append('username', loginData.username)
      .append('password', loginData.password);
    this.http.post('http://localhost:8081/oauth/token', params, {headers:this.HEADERS})
      .subscribe(
        data => {
          this.saveToken(data);
          this.getUserRoles(loginData.username).subscribe(res => {
            this.saveUserData(new User(loginData.username,null, true, res))
          });
          console.log(this.getUserData());
          this.logout();
        },
        err => {
          alert('Invalid Credentials');
        }
      );
  }

  saveToken(token) {
    let expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expires_at', JSON.stringify(expireDate));
  }

  getToken<Token>() {
    return JSON.parse(localStorage.getItem('token'));
  }

  checkToken() {
    return localStorage.getItem('token') != null;
  }

  isExpired() {
    return (this.getExpireIn() <= 0);
  }

  getExpireIn() {
    const expiration = localStorage.getItem('expires_at');
    return JSON.parse(expiration) - new Date().getTime();
  }

  saveUserData(user:User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.saveToken(this.defaultToken);
    this.saveUserData(this.defaultUser);
  }

  getUserRoles(username:string):Observable<Role[]> {
    let options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username)
    };
    return this.http.get<Role[]>(this.API_BASE_HREF + "roles/", options);
  }

}
