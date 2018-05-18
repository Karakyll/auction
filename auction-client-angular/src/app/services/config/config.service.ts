import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

/**
 * Configuration service
 */
@Injectable()
export class ConfigService {

  private BASE_HREF = 'http://localhost:8081/';
  private HEADERS = new HttpHeaders({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });

  /**
   * Constructor for configuration service
   */
  constructor() {
  }

  /**
   * Get base href
   * @returns {string}
   */
  getBaseHref() {
    return this.BASE_HREF;
  }

  /**
   * Get API base href
   * @returns {string}
   */
  getApiHref() {
    return this.BASE_HREF + 'api/';
  }

  /**
   * Get deafault headers
   * @returns {HttpHeaders}
   */
  getHeaders() {
    return this.HEADERS;
  }

}
