import { EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { Role } from '../../models/role';
import { ConfigService } from "../config/config.service";

/**
 * Service to mange authorities
 */
@Injectable()
export class LoginService {

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

  @Output() _loggedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() _loginError: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) { }

  test(data) {
    this.saveUserData(new User(data.username,
      null,
      true,
      [new Role(1, 'ROLE_ADMIN'), new Role(2, 'ROLE_USER'),  new Role(3, 'ROLE_MANAGER')]));
    this.saveToken(new Token('access1', 'BEARER', 2000, ['read', 'write']));
    this._loggedChange.emit(true);
  }

  isAuthenticated() {
    return this.getUserData().userName !== null && !this.isExpired();
  }

  loginUser(loginData) {
    this.requestAccessToken(loginData).subscribe(
      data => {
        this.saveToken(data);
        this.findUserRoles(loginData.username).subscribe(res => {
          this.saveUserData(new User(loginData.username, null, true, res));
        });
        this._loggedChange.emit(true);
      },
      () => {
        this._loginError.emit();
      });
  }

  requestAccessToken(loginData) {
    const params = new HttpParams()
      .set('client_id', 'auctionClient')
      .append('client_secret', 'secret')
      .append('grant_type', 'password')
      .append('username', loginData.username)
      .append('password', loginData.password);
    return this.http.post(this.config.getBaseHref() + 'oauth/token', params, {headers: this.HEADERS});
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
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

  saveUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.saveToken(this.defaultToken);
    this.saveUserData(this.defaultUser);
    this._loggedChange.emit(false);
  }

  findUserRoles(username: string): Observable<Role[]> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username)
    };
    return this.http.get<Role[]>(this.config.getApiHref() + 'roles/', options);
  }

  hasRole(role: string): boolean {
    this.getUserData().roles.forEach(r => {
      if (r.role === role) {
        return true;
      }
    });
    return false;
  }

}
