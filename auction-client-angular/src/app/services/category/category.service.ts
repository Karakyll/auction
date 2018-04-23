import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Category } from "../../models/category";

const uri= 'http://localhost:8081/categories';

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<Category[]> {
    return this.http.get<Category[]>(uri);
  }

  saveCategory(category:Category):Observable<Category> {
    return this.http.post<Category>(uri, category);
  }

  deleteCategory(category:Category) {
    return this.http.delete(uri, {
      params:new HttpParams().set('delete', category.name)
    })
  }

}