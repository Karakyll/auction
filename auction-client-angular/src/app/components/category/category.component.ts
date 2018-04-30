import { Component, OnInit} from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import { Category } from "../../models/category";
import {AuctionService} from "../../services/auction/auction.service";
import {Router} from "@angular/router";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isOpen = false;

  categories:Category[];

  inputCategory:string;

  constructor(
    private categoryService:CategoryService,
    private interact:InteractionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscribeListCategory();
    this.interact._categoryTabToggled.subscribe(res => {
      this.isOpen = !this.isOpen;
    })
  }

  changeCategory(category) {
    if (category) {
      this.interact.categoryChange(category);
      this.isOpen = false;
      this.router.navigate(["/auctions", {category: category}]);
    }
  }

  subscribeListCategory() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
      while (this.categories.length < 10) {
        this.categories.push(new Category(null));
      }
    });
  }

}
