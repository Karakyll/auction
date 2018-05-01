import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product/product.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {InteractionService} from "../../../services/interaction/interaction.service";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products:Product[];
  modalRef:BsModalRef;
  selectedProduct:Product;

  constructor(
    private interact:InteractionService,
    private productService:ProductService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.subscribeCategoryListChanging();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteProduct(): void {
    this.productService.deleteProduct(this.selectedProduct.id).subscribe(res => {
      this.interact.callProductChanging();
      this.products.splice(this.products.indexOf(this.selectedProduct),1);
      this.modalRef.hide();
    });
  }

  declineDeleteProduct(): void {
    this.modalRef.hide();
  }

  subscribeCategoryListChanging() {
    this.interact._categoryListChanged.subscribe(res => {
      this.getProducts();
    })
  }

}
