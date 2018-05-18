import {Component, OnDestroy, OnInit} from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction/interaction.service';

/**
 * Component view categories sidebar
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  isOpen = false;

  categories:Category[];

  private alive: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private interact: InteractionService,
    private router: Router
  ) { }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeListCategory();
    this.subscribeCategoryListChanged();
    this.interact._categoryTabToggled
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.isOpen = !this.isOpen;
    })
  }

  changeCategory(category) {
    if (category) {
      this.interact.categoryChange(category);
      this.isOpen = false;
      this.router.navigate(['/auctions', {category: category}]);
    }
  }

  subscribeListCategory() {
    this.categoryService.findAll()
      .takeWhile(() => this.alive)
      .subscribe((res) => {
      this.categories = res;
    });
  }

  subscribeCategoryListChanged() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.subscribeListCategory();
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
