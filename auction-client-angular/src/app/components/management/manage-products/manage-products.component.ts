import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product/product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InteractionService } from '../../../services/interaction/interaction.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private interact: InteractionService,
    private productService: ProductService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getProducts();
    this.subscribeCategoryListChanging();
  }

  getProducts() {
    this.productService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
      this.products = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteProduct(): void {
    this.productService.deleteById(this.selectedProduct.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.interact.callProductChanging();
      this.products.splice(this.products.indexOf(this.selectedProduct),1);
      this.modalRef.hide();
    });
  }

  declineDeleteProduct(): void {
    this.modalRef.hide();
  }

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
