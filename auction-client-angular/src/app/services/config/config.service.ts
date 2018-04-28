import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Cookie} from "ng2-cookies";

@Injectable()
export class ConfigService {

  constructor() { }

  private API_BASE_HREF = 'http://localhost:8081/api/';
  private LOGIN_HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json'
    }),
    params: new HttpParams()
  };
  private REQUEST_HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ Cookie.get("access_token")
    }),
    params: new HttpParams()
  };
  get_api_base_href() {
    return this.API_BASE_HREF;
  }
  get_login_http_options() {
    return this.LOGIN_HTTP_OPTIONS;
  }
  get_request_http_options() {
    return this.REQUEST_HTTP_OPTIONS;
  }

}
