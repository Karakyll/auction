import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class ConfigService {

  private API_BASE_HREF = 'http://localhost:8081/';
  private HEADERS = new HttpHeaders({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });

  constructor() { }

  getBaseHref() {
    return this.API_BASE_HREF;
  }

  getApiHref() {
    return this.API_BASE_HREF + 'api/';
  }

  getHeaders() {
    return this.HEADERS;
  }

}
