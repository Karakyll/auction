import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Auction } from '../../../models/auction';
import { AuctionService } from '../../../services/auction/auction.service';
import { InteractionService } from '../../../services/interaction/interaction.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private interact: InteractionService,
    private auctionService: AuctionService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getAuctions();
    this.subscribeUserListChanging();
    this.subscribeProductListChanging();
    this.subscribeCategoryListChanging();
  }

  getAuctions() {
    this.auctionService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
      this.auctions = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteAuction(): void {
    this.auctionService.deleteById(this.selectedAuction.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.interact.callAuctionChanging();
      this.auctions.splice(this.auctions.indexOf(this.selectedAuction),1);
      this.modalRef.hide();
    });
  }

  declineDeleteAuction(): void {
    this.modalRef.hide();
  }

  subscribeUserListChanging() {
    this.interact._userListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getAuctions();
    })
  }

  subscribeProductListChanging() {
    this.interact._productListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getAuctions();
    })
  }

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
