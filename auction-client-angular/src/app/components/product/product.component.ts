import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    })
  }

  deleteProduct(product) {
    console.log("call delete");
    this.productService.deleteProduct(product.id).subscribe((res) => {
      console.log(res);
    })
  }

  saveProduct(product) {
    console.log("call save");
    this.productService.saveProduct(product).subscribe((res) => {
      console.log(res);
    })
  }

}
