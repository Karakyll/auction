import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user";
import {LoginService} from "../login/login.service";

@Injectable()
export class UserService {

  private API_BASE_HREF = 'http://localhost:8081/api/';
  private HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json'
    })
  };

  constructor(private http:HttpClient, private api:LoginService){}

  uri() {
    return this.API_BASE_HREF + "admin/users";
  }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.uri(), this.HTTP_OPTIONS);
  }

  getUserByUserName(username:string):Observable<User> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('username', username);
    return this.http.get<User>(this.uri(), options);
  }

  getEnabledUsers(enabled):Observable<User[]> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('enabled', enabled);
    return this.http.get<User[]>(this.uri(), options);
  }

  saveUser(user:User):Observable<User> {
    return this.http.post<User>(this.uri(), user, this.HTTP_OPTIONS);
  }

  deleteUser(username:string) {
    return this.http.delete(this.uri(), {
      params:new HttpParams().set('delete', username)
    });
  }

  enableUser(username:string):Observable<User> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('username', username).append('enable', "true");
    return this.http.put<User>(this.uri(), null, options);
  }

  disableUser(username:string):Observable<User> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('username', username).append('enable', "false");
    return this.http.put<User>(this.uri(), null, options);
  }

  promoteUser(username:string):Observable<User> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('username', username).append('promote', "true");
    return this.http.put<User>(this.uri(), null, options);
  }

  demoteUser(username:string):Observable<User> {
    let options = this.HTTP_OPTIONS;
    options['params'] = new HttpParams().append('username', username).append('promote', "false");
    return this.http.put<User>(this.uri(), null, options);
  }

}
