import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {InteractionService} from '../../services/interaction/interaction.service';

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

  categories: Category[];

  private alive: boolean = true;

  /**
   * Constructor fo Category component
   * @param {CategoryService} categoryService
   * @param {InteractionService} interact
   * @param {Router} router
   */
  constructor(private categoryService: CategoryService,
              private interact: InteractionService,
              private router: Router) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getCategories();
    this.subscribeCategoryListChanged();
    this.interact._categoryTabToggled
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.isOpen = !this.isOpen;
      })
  }

  /**
   * Handle click on category
   * Navigate to auctions page with selected category filter
   * @param category
   */
  changeCategory(category) {
    if (category) {
      this.interact.categoryChange(category);
      this.isOpen = false;
      this.router.navigate(['/auctions', {category: category}]);
    }
  }

  /**
   * Get categories list
   */
  getCategories() {
    this.categoryService.findAll()
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.categories = res;
      });
  }

  /**
   * Subscribe to category list changed
   * If emitted - refresh category list
   */
  subscribeCategoryListChanged() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getCategories();
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
