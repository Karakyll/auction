import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/category/category.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  categories:Category[];
  newCategory:string = "";
  modalRef:BsModalRef;
  selectedCategory:Category;
  failed:boolean = false;

  constructor(
    private categoryService:CategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }

  addNewCategory() {
    this.categoryService.saveCategory(new Category(this.newCategory)).subscribe(
      res => {
        this.newCategory = "";
        this.categories.push(res);
      },
      err => {
        this.failed = true;
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.categoryService.deleteCategory(this.selectedCategory).subscribe(res => {
      this.categories.splice(this.categories.indexOf(this.selectedCategory),1);
      this.modalRef.hide();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

}
