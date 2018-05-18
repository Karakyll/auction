import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product/product.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {InteractionService} from '../../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /management products tab
 */
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  modalRef: BsModalRef;
  selectedProduct: Product;

  private alive: boolean = true;

  /**
   * Constructor for manage-products component
   * @param {InteractionService} interact
   * @param {ProductService} productService
   * @param {BsModalService} modalService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private productService: ProductService,
              private modalService: BsModalService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getProducts();
    this.subscribeCategoryListChanging();
  }

  /**
   * Get products list
   */
  getProducts() {
    this.productService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.products = res;
      })
  }

  /**
   * Open confirm delete modal
   * @param {TemplateRef<any>} template
   */
  openConfirmDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirm deleting
   * Delete product by ID
   */
  confirmDeleteProduct(): void {
    this.productService.deleteById(this.selectedProduct.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.interact.callProductChanging();
        this.products.splice(this.products.indexOf(this.selectedProduct), 1);
        this.modalRef.hide();
      });
  }

  /**
   * Decline deleting
   * Hide modal
   */
  declineDeleteProduct(): void {
    this.modalRef.hide();
  }

  /**
   * Subscribe categories list changing
   * If emitted- refresh products list
   */
  subscribeCategoryListChanging() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getProducts();
      })
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
