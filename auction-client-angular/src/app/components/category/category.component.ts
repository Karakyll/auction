import { Component, OnInit} from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import { Category } from "../../models/category";
import {AuctionService} from "../../services/auction/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isOpen = false;

  categories:Category[];

  inputCategory:string;

  constructor(private categoryService:CategoryService, private auctionService:AuctionService, private router:Router) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
      while (this.categories.length < 10) {
        this.categories.push(new Category(null));
      }
    });
    this.categoryService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    })
  }

  changeCategory(category) {
    if (category) {
      this.auctionService.categoryChange(category);
      this.router.navigate(["/auctions", {category: category}]);
    }
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
