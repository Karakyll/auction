import { Component, OnInit} from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import { Category } from "../../models/category";
import {AuctionService} from "../../services/auction/auction.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isOpen = false;

  categories:Category[];

  inputCategory:string;

  constructor(private categoryService:CategoryService, private auctionService:AuctionService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.categoryService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    })
  }

  changeCategory(category) {
    this.auctionService.categoryChange(category);
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
