import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Cookie } from "ng2-cookies"
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  obtainAccessToken(loginData) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
      }),
      params: new HttpParams()
        .set('client_id','auctionClientIdPassword')
        .append('client_secret', 'secret')
        .append('grant_type','password')
        .append('username', loginData.username)
        .append('password', loginData.password)
    };

    console.log(httpOptions);
    this.http.post('http://localhost:8081/oauth/token', null, httpOptions)
      .subscribe(
        data => this.saveToken(data),
        err => {
          alert('Invalid Credentials');
        }
      );
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this.router.navigate(['/llogin']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this.router.navigate(['/llogin']);
  }

}
