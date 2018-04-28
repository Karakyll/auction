import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user";
import {ConfigService} from "../config/config.service";

@Injectable()
export class UserService {

  constructor(private http:HttpClient, private api:ConfigService){}

  uri() {
    return this.api.get_api_base_href() + "admin/users";
  }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.uri(), this.api.get_request_http_options());
  }

  getUserByUserName(username:string):Observable<User> {
    let options = this.api.get_request_http_options();
    options.params.append('username', username);
    return this.http.get<User>(this.uri(), options);
  }

  getEnabledUsers(enabled):Observable<User[]> {
    let options = this.api.get_request_http_options();
    options.params.append('enabled', enabled);
    return this.http.get<User[]>(this.uri(), options);
  }

  saveUser(user:User):Observable<User> {
    return this.http.post<User>(this.uri(), user, this.api.get_request_http_options());
  }

  deleteUser(username:string) {
    return this.http.delete(this.uri(), {
      params:new HttpParams().set('delete', username)
    });
  }

  enableUser(username:string):Observable<User> {
    let options = this.api.get_request_http_options();
    options.params.append('username', username).append('enable', "true");
    return this.http.put<User>(this.uri(), null, options);
  }

  disableUser(username:string):Observable<User> {
    let options = this.api.get_request_http_options();
    options.params.append('username', username).append('enable', "false");
    return this.http.put<User>(this.uri(), null, options);
  }

  promoteUser(username:string):Observable<User> {
    let options = this.api.get_request_http_options();
    options.params.append('username', username).append('promote', "true");
    return this.http.put<User>(this.uri(), null, options);
  }

  demoteUser(username:string):Observable<User> {
    let options = this.api.get_request_http_options();
    options.params.append('username', username).append('promote', "false");
    return this.http.put<User>(this.uri(), null, options);
  }

}
