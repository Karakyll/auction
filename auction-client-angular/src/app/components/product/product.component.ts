import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../models/product';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category/category.service';
import {InteractionService} from '../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

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

  newProduct: Product = {
    id: null,
    name: '',
    category_name: '',
    price: null,
    description: ''
  };

  /**
   * Constructor for product component
   * @param {InteractionService} interact
   * @param {ProductService} productService
   * @param {CategoryService} categoryService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeCreateProductCall();
    this.subscribeEditNewProductCall();
    this.subscribeSelectProductCall();
  }

  /**
   * Subscribe select product button click
   * If emitted - toggle select product modal
   */
  subscribeSelectProductCall() {
    this.interact._selectExistProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getProductList();
        this.selectProductModal.config = this.config;
        this.selectProductModal.toggle();
      })
  }

  /**
   * Subscribe create product button click
   * If emitted - toggle new product modal
   */
  subscribeCreateProductCall() {
    this.interact._createNewProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getCategoryList();
        this.newProductModal.config = this.config;
        this.newProductModal.toggle();
      })
  }

  /**
   * Subscribe edit new product button click
   * If emitted - toggle new product modal
   */
  subscribeEditNewProductCall() {
    this.interact._editNewProductCalled
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.newProductModal.config = this.config;
        this.newProductModal.toggle();
      })
  }

  /**
   * Get products list
   */
  getProductList() {
    this.productService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.products = res;
      })
  }

  /**
   * Get categories list
   */
  getCategoryList() {
    this.categoryService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.categories = res;
      })
  }

  /**
   * Hide new product modal
   */
  hideNewProductModal() {
    this.newProductModal.hide();
  }

  /**
   * Hide select product modal
   */
  hideSelectProductModal() {
    this.selectProductModal.hide()
  }

  /**
   * Handle submitting new product form
   */
  onSubmitNewProduct() {
    this.interact.selectProduct(this.newProduct);
    this.newProductModal.hide();
  }

  /**
   * Handle selecting product
   * @param product
   */
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
