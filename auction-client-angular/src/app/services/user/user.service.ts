import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';
import {LoginService} from '../login/login.service';
import {ConfigService} from '../config/config.service';

/**
 * Service to access users data
 */
@Injectable()
export class UserService {

  /**
   * Constructor for user service
   * @param {HttpClient} http
   * @param {LoginService} api
   * @param {ConfigService} config
   */
  constructor(private http: HttpClient,
              private api: LoginService,
              private config: ConfigService) {
  }

  /**
   * Get api uri
   * @returns {string}
   */
  uri() {
    return this.config.getApiHref() + 'admin/users';
  }

  /**
   * Find all users
   * @returns {Observable<User[]>}
   */
  findAll(): Observable<User[]> {
    const options = {headers: this.config.getHeaders()};
    return this.http.get<User[]>(this.uri(), options);
  }

  /**
   * Find user by username
   * @param {string} username
   * @returns {Observable<User>}
   */
  findByUserName(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username)
    };
    return this.http.get<User>(this.uri(), options);
  }

  /**
   * Find user by enabled parameter
   * @param enabled
   * @returns {Observable<User[]>}
   */
  findByEnabled(enabled): Observable<User[]> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('enabled', enabled)
    };
    return this.http.get<User[]>(this.uri(), options);
  }

  /**
   * Save user
   * @param {User} user
   * @returns {Observable<User>}
   */
  save(user: User): Observable<User> {
    const options = {headers: this.config.getHeaders()};
    return this.http.post<User>(this.uri(), user, options);
  }

  /**
   * Delete user
   * @param {string} username
   * @returns {Observable<Object>}
   */
  deleteUser(username: string) {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().set('delete', username)
    };
    return this.http.delete(this.uri(), options);
  }

  /**
   * Enable user
   * @param {string} username
   * @returns {Observable<User>}
   */
  enable(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('enable', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  /**
   * Disable user
   * @param {string} username
   * @returns {Observable<User>}
   */
  disable(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('enable', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  /**
   * Promote user with manager role
   * @param {string} username
   * @returns {Observable<User>}
   */
  promote(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('promote', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  /**
   * Demote user
   * @param {string} username
   * @returns {Observable<User>}
   */
  demote(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('promote', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  /**
   * Change user password
   * @param {User} user
   * @returns {Observable<User>}
   */
  changePassword(user: User): Observable<User> {
    const options = {headers: this.config.getHeaders()};
    return this.http.put<User>(this.uri(), user, options);
  }

}
