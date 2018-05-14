import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/category';
import { ConfigService } from "../config/config.service";

/**
 * Service to access categories data
 */
@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  uri() {
    return this.config.getApiHref() + 'categories';
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.uri());
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.uri(), category);
  }

  deleteCategory(category: Category) {
    return this.http.delete(this.uri(), {
      params: new HttpParams().set('delete', category.name)
    });
  }

}
