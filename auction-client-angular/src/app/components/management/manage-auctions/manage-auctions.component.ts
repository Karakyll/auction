import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Auction} from '../../../models/auction';
import {AuctionService} from '../../../services/auction/auction.service';
import {InteractionService} from '../../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /management auctions tab
 */
@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit, OnDestroy {

  auctions: Auction[];
  modalRef: BsModalRef;
  selectedAuction: Auction;
  private alive: boolean = true;

  /**
   * Constructor for manage-auctions component
   * @param {InteractionService} interact
   * @param {AuctionService} auctionService
   * @param {BsModalService} modalService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private auctionService: AuctionService,
              private modalService: BsModalService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getAuctions();
    this.subscribeUserListChanging();
    this.subscribeProductListChanging();
    this.subscribeCategoryListChanging();
  }

  /**
   * get auctions list
   */
  getAuctions() {
    this.auctionService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.auctions = res;
      })
  }

  /**
   * Open confirm delete modal
   * @param {TemplateRef<any>} template
   */
  openConfirmDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirm deleting auction
   * Delete auction by id
   */
  confirmDeleteAuction(): void {
    this.auctionService.deleteById(this.selectedAuction.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.interact.callAuctionChanging();
        this.auctions.splice(this.auctions.indexOf(this.selectedAuction), 1);
        this.modalRef.hide();
      });
  }

  /**
   * Decline deleting auction
   * Hide modal
   */
  declineDeleteAuction(): void {
    this.modalRef.hide();
  }

  /**
   * Subscribe user list changing
   * If emitted- refresh auctions list
   */
  subscribeUserListChanging() {
    this.interact._userListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getAuctions();
      })
  }

  /**
   * Subscribe products list changing
   * If emitted- refresh auctions list
   */
  subscribeProductListChanging() {
    this.interact._productListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getAuctions();
      })
  }

  /**
   * Subscribe categories list changing
   * If emitted- refresh auctions list
   */
  subscribeCategoryListChanging() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getAuctions();
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
