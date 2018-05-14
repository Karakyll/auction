import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { LoginService } from '../login/login.service';
import { ConfigService } from '../config/config.service';

/**
 * Service to access users data
 */
@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private api: LoginService,
    private config: ConfigService
  ) {}

  uri() {
    return this.config.getApiHref() + 'admin/users';
  }

  findAll(): Observable<User[]> {
    const options = {headers: this.config.getHeaders()};
    return this.http.get<User[]>(this.uri(), options);
  }

  findByUserName(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username)
    };
    return this.http.get<User>(this.uri(), options);
  }

  findByEnabled(enabled): Observable<User[]> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('enabled', enabled)
    };
    return this.http.get<User[]>(this.uri(), options);
  }

  save(user: User): Observable<User> {
    const options = {headers: this.config.getHeaders()};
    return this.http.post<User>(this.uri(), user, options);
  }

  deleteUser(username: string) {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().set('delete', username)
    };
    return this.http.delete(this.uri(), options);
  }

  enable(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('enable', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  disable(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('enable', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  promote(username: string): Observable<User> {
   const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('promote', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  demote(username: string): Observable<User> {
    const options = {
      headers: this.config.getHeaders(),
      params: new HttpParams().append('username', username).append('promote', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  changePassword(user: User): Observable<User> {
    const options = {headers: this.config.getHeaders()};
    return this.http.put<User>(this.uri(), user, options);
  }

}
