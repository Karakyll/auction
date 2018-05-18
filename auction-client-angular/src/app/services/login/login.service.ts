import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Token} from '../../models/token';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Observable';
import {Role} from '../../models/role';
import {ConfigService} from "../config/config.service";

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

  /**
   * Constructor for Login service
   * @param {HttpClient} http
   * @param {Router} router
   * @param {ConfigService} config
   */
  constructor(private http: HttpClient,
              private router: Router,
              private config: ConfigService) {
  }

  /**
   * Test login method with mocked test data
   * Used wile developing in debug mode
   * @param data
   */
  test(data) {
    this.saveUserData(new User(data.username,
      null,
      true,
      [new Role(1, 'ROLE_ADMIN'), new Role(2, 'ROLE_USER'), new Role(3, 'ROLE_MANAGER')]));
    this.saveToken(new Token('access1', 'BEARER', 2000, ['read', 'write']));
    this._loggedChange.emit(true);
  }

  /**
   * Check is current user authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getUserData().userName !== null && !this.isExpired();
  }

  /**
   * Login user with credentials
   * @param loginData
   */
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

  /**
   * Request access token from OAuth2 authorization server
   * @param loginData
   * @returns {Observable<Object>}
   */
  requestAccessToken(loginData) {
    const params = new HttpParams()
      .set('client_id', 'auctionClient')
      .append('client_secret', 'secret')
      .append('grant_type', 'password')
      .append('username', loginData.username)
      .append('password', loginData.password);
    return this.http.post(this.config.getBaseHref() + 'oauth/token', params, {headers: this.HEADERS});
  }

  /**
   * Save token in local storage
   * @param token
   */
  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expires_at', JSON.stringify(expireDate));
  }

  /**
   * Get token from local storage
   * @returns {any}
   */
  getToken<Token>() {
    return JSON.parse(localStorage.getItem('token'));
  }

  /**
   * Check is token present in local storage
   * @returns {boolean}
   */
  checkToken() {
    return localStorage.getItem('token') != null;
  }

  /**
   * Check for token is expired
   * @returns {boolean}
   */
  isExpired() {
    return (this.getExpireIn() <= 0);
  }

  /**
   * Get token expiration time
   * @returns {number}
   */
  getExpireIn() {
    const expiration = localStorage.getItem('expires_at');
    return JSON.parse(expiration) - new Date().getTime();
  }

  /**
   * Save user data in local storage
   * @param {User} user
   */
  saveUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get user data from local storage
   * @returns {User}
   */
  getUserData(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Logout user
   */
  logout() {
    this.saveToken(this.defaultToken);
    this.saveUserData(this.defaultUser);
    this._loggedChange.emit(false);
  }

  /**
   * Find user roles
   * @param {string} username
   * @returns {Observable<Role[]>}
   */
  findUserRoles(username: string): Observable<Role[]> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username)
    };
    return this.http.get<Role[]>(this.config.getApiHref() + 'roles/', options);
  }

  /**
   * Check is user has role
   * @param {string} role
   * @returns {boolean}
   */
  hasRole(role: string): boolean {
    this.getUserData().roles.forEach(r => {
      if (r.role === role) {
        return true;
      }
    });
    return false;
  }

}
