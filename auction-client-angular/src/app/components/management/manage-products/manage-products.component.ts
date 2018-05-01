import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product/product.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

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
    private productService:ProductService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.productService.deleteProduct(this.selectedProduct.id).subscribe(res => {
      this.products.splice(this.products.indexOf(this.selectedProduct),1);
      this.modalRef.hide();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

}
