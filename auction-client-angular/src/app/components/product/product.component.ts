import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import { InteractionService } from '../../services/interaction/interaction.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component view new product modal
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  @ViewChild('newProductModal') newProductModal: ModalDirective;
  @ViewChild('selectProductModal') selectProductModal: ModalDirective;

  config = {
    keyboard: false,
    backdrop: false,
    outsideClick: false
  };

  categories: Category[];
  products: Product[];

  unset;
  private alive: boolean = true;

  newProduct:Product = {
    id: null,
    name: '',
    category_name: '',
    price: null,
    description: ''
  };

  constructor(
    private interact: InteractionService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private translate: TranslateService
  ) { }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeCreateProductCall();
    this.subscribeEditNewProductCall();
    this.subscribeSelectProductCall();
  }

  subscribeSelectProductCall() {
    this.interact._selectExistProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getProductList();
      this.selectProductModal.config = this.config;
      this.selectProductModal.toggle();
    })
  }

  subscribeCreateProductCall() {
    this.interact._createNewProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getCategoryList();
      this.newProductModal.config = this.config;
      this.newProductModal.toggle();
    })
  }

  subscribeEditNewProductCall() {
    this.interact._editNewProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.newProductModal.config = this.config;
      this.newProductModal.toggle();
    })
  }

  getProductList() {
    this.productService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
      this.products = res;
    })
  }

  getCategoryList() {
    this.categoryService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
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

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
