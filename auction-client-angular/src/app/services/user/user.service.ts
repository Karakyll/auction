import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {User} from "../../models/user";

const uri= 'http://localhost:8081/admin/users';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(uri);
  }

  getUserByUserName(username:string):Observable<User> {
    return this.http.get<User>(uri, {
      params:new HttpParams().set('username', username)
    });
  }

  getEnabledUsers(enabled):Observable<User[]> {
    return this.http.get<User[]>(uri, {
      params:new HttpParams().set('enabled', enabled)
    });
  }

  saveUser(user:User):Observable<User> {
    return this.http.post<User>(uri, user);
  }

  deleteUser(username:string) {
    return this.http.delete(uri, {
      params:new HttpParams().set('delete', username)
    });
  }

  enableUser(username:string):Observable<User> {
    return this.http.put<User>(uri, null, {
      params:new HttpParams().set('username', username).append('enable', "true")
    });
  }

  disableUser(username:string):Observable<User> {
    return this.http.put<User>(uri, null, {
      params:new HttpParams().set('username', username).append('enable', "false")
    });
  }

  promoteUser(username:string):Observable<User> {
    return this.http.put<User>(uri, null, {
      params:new HttpParams().set('username', username).append('promote', "true")
    });
  }

  demoteUser(username:string):Observable<User> {
    return this.http.put<User>(uri, null, {
      params:new HttpParams().set('username', username).append('promote', "false")
    });
  }

}
