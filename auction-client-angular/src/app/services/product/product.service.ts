import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../../models/product';
import {ConfigService} from "../config/config.service";

/**
 * Service to access products data
 */
@Injectable()
export class ProductService {

  /**
   * Constructor for product service
   * @param {HttpClient} http
   * @param {ConfigService} config
   */
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  /**
   * Get api uri
   * @returns {string}
   */
  uri() {
    return this.config.getApiHref() + 'products';
  }

  /**
   * Find all products
   * @returns {Observable<Product[]>}
   */
  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.uri());
  }

  /**
   * Find product by id
   * @param {number} id
   * @returns {Observable<Product>}
   */
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.uri() + '/' + id);
  }

  /**
   * Save product
   * @param {Product} product
   * @returns {Observable<Product>}
   */
  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.uri(), product);
  }

  /**
   * Delete product by id
   * @param {number} id
   * @returns {Observable<Object>}
   */
  deleteById(id: number) {
    return this.http.delete(this.uri() + '/' + id);
  }
}
