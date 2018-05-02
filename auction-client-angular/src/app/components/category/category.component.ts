import { Component, OnInit} from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import { Category } from "../../models/category";
import { Router } from "@angular/router";
import {InteractionService} from "../../services/interaction/interaction.service";

/**
 * Component view categories sidebar
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isOpen = false;

  categories:Category[];

  constructor(
    private categoryService:CategoryService,
    private interact:InteractionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscribeListCategory();
    this.subscribeCategoryListChanged();
    this.interact._categoryTabToggled.subscribe(() => {
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

  subscribeCategoryListChanged() {
    this.interact._categoryListChanged.subscribe(() => {
      this.subscribeListCategory();
    })
  }

}
