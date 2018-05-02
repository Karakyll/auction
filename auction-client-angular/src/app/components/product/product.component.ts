import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../models/product";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category/category.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";

/**
 * Component view new product modal
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('newProductModal') newProductModal: ModalDirective;
  @ViewChild('selectProductModal') selectProductModal: ModalDirective;

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
    private categoryService:CategoryService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscribeCreateProductCall();
    this.subscribeEditNewProductCall();
    this.subscribeSelectProductCall();
  }

  subscribeSelectProductCall() {
    this.interact._selectExistProductCalled.subscribe(() => {
      this.getProductList();
      this.selectProductModal.config = this.config;
      this.selectProductModal.toggle();
    })
  }

  subscribeCreateProductCall() {
    this.interact._createNewProductCalled.subscribe(() => {
      this.getCategoryList();
      this.newProductModal.config = this.config;
      this.newProductModal.toggle();
    })
  }

  subscribeEditNewProductCall() {
    this.interact._editNewProductCalled.subscribe(() => {
      this.newProductModal.config = this.config;
      this.newProductModal.toggle();
    })
  }

  getProductList() {
    this.productService.getAllProducts().subscribe(res => {
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

  hideProductsModal() {
    this.selectProductModal.hide()
  }

  onSubmitNewProduct() {
    this.interact.selectProduct(this.newProduct);
    this.newProductModal.hide();
  }

  selectProduct(product) {
    this.interact.selectProduct(product);
    this.selectProductModal.hide();
  }

}
