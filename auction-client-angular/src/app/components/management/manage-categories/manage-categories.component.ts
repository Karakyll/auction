import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category/category.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {InteractionService} from '../../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /management categories tab
 */
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit, OnDestroy {

  categories: Category[];
  newCategory: string = '';
  modalRef: BsModalRef;
  selectedCategory: Category;
  failed: boolean = false;
  buttonLocked: boolean = false;

  private alive: boolean = true;

  /**
   * Constructor for manage-categories component
   * @param {InteractionService} interact
   * @param {CategoryService} categoryService
   * @param {BsModalService} modalService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private categoryService: CategoryService,
              private modalService: BsModalService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getCategoryList();
  }

  /**
   * Get categories list
   */
  getCategoryList() {
    this.categoryService.findAll().subscribe(res => {
      this.categories = res;
    })
  }

  /**
   * Add new category
   */
  addNewCategory() {
    this.buttonLocked = true;
    this.categoryService.save(new Category(this.newCategory))
      .takeWhile(() => this.alive)
      .subscribe(
        res => {
          this.interact.callCategoryChanging();
          this.newCategory = '';
          this.categories.push(res);
          this.buttonLocked = false;
        },
        () => {
          console.log('err. category exist.')
          this.failed = true;
          this.buttonLocked = false;
        }
      )
  }

  /**
   * Open confirm delete modal
   * @param {TemplateRef<any>} template
   */
  openConfirmDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirm deleting
   * Delete category
   */
  confirmDeleteCategory(): void {
    this.categoryService.deleteCategory(this.selectedCategory)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.interact.callCategoryChanging();
        this.categories.splice(this.categories.indexOf(this.selectedCategory), 1);
        this.modalRef.hide();
      });
  }

  /**
   * Decline deleting
   * Hide modal
   */
  declineDeleteCategory(): void {
    this.modalRef.hide();
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
