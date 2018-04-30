import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../models/product";
import {ModalDirective} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('newProductModal') newProductModal: ModalDirective;

  config = {
    keyboard: true,
    backdrop: false
  };

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
