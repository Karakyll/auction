import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from '../../models/category';
import {ConfigService} from "../config/config.service";

/**
 * Service to access categories data
 */
@Injectable()
export class CategoryService {

  /**
   * Constructor for category service
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
    return this.config.getApiHref() + 'categories';
  }

  /**
   * Find all categories
   * @returns {Observable<Category[]>}
   */
  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.uri());
  }

  /**
   * Save category
   * @param {Category} category
   * @returns {Observable<Category>}
   */
  save(category: Category): Observable<Category> {
    return this.http.post<Category>(this.uri(), category);
  }

  /**
   * Delete category
   * @param {Category} category
   * @returns {Observable<Object>}
   */
  deleteCategory(category: Category) {
    return this.http.delete(this.uri(), {
      params: new HttpParams().set('delete', category.name)
    });
  }

}
