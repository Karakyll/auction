import {EventEmitter, Injectable, Output} from '@angular/core';
import {Auction} from "../../models/auction";

@Injectable()
export class InteractionService {

  @Output() createProductCalled: EventEmitter<any> = new EventEmitter();

  @Output() categoryTabToggled: EventEmitter<any> = new EventEmitter();

  auction:Auction;
  @Output() betsModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() newBetModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() betsRefresh: EventEmitter<any> = new EventEmitter();

  @Output() searchTagChanged: EventEmitter<string> = new EventEmitter();
  @Output() categoryChanged: EventEmitter<string> = new EventEmitter();
  @Output() auctionTabClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  toggleCreateProductModal() {
    this.createProductCalled.emit();
  }

  toggleCategoryTab() {
    this.categoryTabToggled.emit();
  }

  toggleBetsHistoryModal(auction) {
    this.auction = auction;
    this.betsModalCalled.emit(this.auction);
  }

  toggleNewBetModal(auction) {
    this.auction = auction;
    this.newBetModalCalled.emit(this.auction);
  }

  refreshBets() {
    this.betsRefresh.emit();
  }

  searchTagChange(searchTag:string) {
    this.searchTagChanged.emit(searchTag);
  }

  categoryChange(category:string) {
    this.categoryChanged.emit(category);
  }

  refreshAuctionPage() {
    this.auctionTabClicked.emit();
  }

}
