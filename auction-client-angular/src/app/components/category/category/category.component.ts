import { Component, OnInit } from '@angular/core';
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/category/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[];

  inputCategory:string;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    })
  }

  saveCategory() {
    console.log("call save");
    this.categoryService.saveCategory(new Category(this.inputCategory)).subscribe((res) => {
      console.log(res);
    })
  }

  deleteCategory(category) {
    console.log("call delete");
    this.categoryService.deleteCategory(category).subscribe();
  }

}
