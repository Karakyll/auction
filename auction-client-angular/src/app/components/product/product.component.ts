import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../models/product";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category/category.service";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('newProductModal') newProductModal: ModalDirective;

  config = {
    keyboard: false,
    backdrop: false,
    outsideClick: false
  };

  categories:Category[];
  products:Product[];

  newProduct:Product = {
    id: null,
    name: "",
    category_name: "",
    price: null,
    description: ""
  };

  constructor(
    private interact:InteractionService,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { }

  ngOnInit() {
    this.subscribeCreateProductCall();
  }

  subscribeCreateProductCall() {
    this.interact.createProductCalled.subscribe(res => {
      this.getCategoryList();
      this.newProductModal.config = this.config;
      this.newProductModal.toggle();
    })
  }

  getProductList() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    })
  }

  getCategoryList() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }

  hideNewProductModal() {
    this.newProductModal.hide();
  }

  onSubmitNewProduct() {
    console.log(this.newProduct);
    console.log("TODO");
    this.newProductModal.hide();
  }

}
