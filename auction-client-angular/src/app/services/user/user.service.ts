import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { LoginService } from '../login/login.service';

/**
 * Service to access users data
 */
@Injectable()
export class UserService {

  private API_BASE_HREF = 'http://localhost:8081/api/';
  private HEADERS = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json'
    });

  constructor(
    private http: HttpClient,
    private api: LoginService
  ) {}

  uri() {
    return this.API_BASE_HREF + 'admin/users';
  }

  getAllUsers(): Observable<User[]> {
    const options = {headers: this.HEADERS};
    return this.http.get<User[]>(this.uri(), options);
  }

  getUserByUserName(username: string): Observable<User> {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username)
    };
    return this.http.get<User>(this.uri(), options);
  }

  getEnabledUsers(enabled): Observable<User[]> {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('enabled', enabled)
    };
    return this.http.get<User[]>(this.uri(), options);
  }

  saveUser(user: User): Observable<User> {
    const options = {headers: this.HEADERS};
    return this.http.post<User>(this.uri(), user, options);
  }

  deleteUser(username: string) {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().set('delete', username)
    };
    return this.http.delete(this.uri(), options);
  }

  enableUser(username: string): Observable<User> {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username).append('enable', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  disableUser(username: string): Observable<User> {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username).append('enable', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  promoteUser(username: string): Observable<User> {
   const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username).append('promote', 'true')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  demoteUser(username: string): Observable<User> {
    const options = {
      headers: this.HEADERS,
      params: new HttpParams().append('username', username).append('promote', 'false')
    };
    return this.http.put<User>(this.uri(), null, options);
  }

  changePassword(user: User): Observable<User> {
    const options = {headers: this.HEADERS};
    return this.http.put<User>(this.uri(), user, options);
  }

}
