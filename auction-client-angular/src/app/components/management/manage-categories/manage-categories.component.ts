import { Component, OnInit, TemplateRef } from '@angular/core';
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/category/category.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";

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
  buttonLocked:boolean = false;

  constructor(
    private interact:InteractionService,
    private categoryService:CategoryService,
    private modalService: BsModalService,
    private translate: TranslateService
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
    this.buttonLocked = true;
    this.categoryService.saveCategory(new Category(this.newCategory)).subscribe(
      res => {
        this.interact.callCategoryChanging();
        this.newCategory = "";
        this.categories.push(res);
        this.buttonLocked = false;
      },
      () => {
        this.failed = true;
        this.buttonLocked = false;
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteCategory(): void {
    this.categoryService.deleteCategory(this.selectedCategory).subscribe(() => {
      this.interact.callCategoryChanging();
      this.categories.splice(this.categories.indexOf(this.selectedCategory),1);
      this.modalRef.hide();
    });
  }

  declineDeleteCategory(): void {
    this.modalRef.hide();
  }

}
