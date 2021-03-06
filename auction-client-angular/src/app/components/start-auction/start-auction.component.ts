import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auction} from '../../models/auction';
import {ProductService} from '../../services/product/product.service';
import {InteractionService} from '../../services/interaction/interaction.service';
import {LoginService} from '../../services/login/login.service';
import {AuctionService} from '../../services/auction/auction.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Product} from "../../models/product";

/**
 * Component view /auction/start page
 */
@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent implements OnInit, OnDestroy {

  duration: number;
  buttonLocked: boolean = false;

  private alive: boolean = true;

  newAuction: Auction = {
    id: null,
    product: null,
    owner_name: '',
    createTime: null,
    endTime: null,
    description: null,
    finished: null
  };

  /**
   * Constructor for start-auction component
   * @param {InteractionService} interact
   * @param {ProductService} productService
   * @param {AuctionService} auctionService
   * @param {LoginService} auth
   * @param {Router} router
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private productService: ProductService,
              private auctionService: AuctionService,
              private auth: LoginService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeProductSelected();
  }

  /**
   * Save auction
   */
  startAuction() {
    this.newAuction.owner_name = this.auth.getUserData().userName;
    this.newAuction.finished = false;
    this.auctionService.save(this.newAuction, this.duration)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.router.navigateByUrl('/auctions/' + res.id);
        this.buttonLocked = false;
      });
  }

  /**
   * Handle select exist product button click
   * Call select product modal
   */
  selectExistProduct() {
    this.interact.toggleSelectProductModal();
  }

  /**
   * Handle create new product button click
   * Call create new product modal
   */
  createNewProduct() {
    this.interact.toggleCreateNewProductModal();
  }

  /**
   * Handle edit new product button click
   * Call edit new product modal
   */
  editNewProduct() {
    this.interact.toggleEditNewProductModal();
  }

  /**
   * Subscribe to product selected
   */
  subscribeProductSelected() {
    this.interact._productSelected
      .takeWhile(() => this.alive)
      .subscribe(product => {
        this.newAuction.product = new Product(product.id, product.name,
          product.category_name, product.price, product.description);
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
