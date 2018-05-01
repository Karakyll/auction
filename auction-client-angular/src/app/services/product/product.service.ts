import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Product } from "../../models/product";

const uri= 'http://localhost:8081/api/products';

@Injectable()
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(uri);
  }

  getProductById(id:number):Observable<Product> {
    return this.http.get<Product>(uri + "/" + id);
  }

  saveProduct(product:Product):Observable<Product> {
    return this.http.post<Product>(uri, product);
  }

  deleteProduct(id:number) {
    return this.http.delete(uri + "/" + id);
  }
}
