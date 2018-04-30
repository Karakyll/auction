import {EventEmitter, Injectable, Output} from '@angular/core';
import {Auction} from "../../models/auction";
import {Product} from "../../models/product";

@Injectable()
export class InteractionService {

  @Output() _selectExistProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _createNewProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _editNewProductCalled: EventEmitter<any> = new EventEmitter();

  @Output() _categoryTabToggled: EventEmitter<any> = new EventEmitter();

  auction:Auction;
  @Output() _betsModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() _newBetModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() _betsRefresh: EventEmitter<any> = new EventEmitter();

  @Output() _searchTagChanged: EventEmitter<string> = new EventEmitter();
  @Output() _categoryChanged: EventEmitter<string> = new EventEmitter();
  @Output() _auctionTabClicked: EventEmitter<any> = new EventEmitter();

  @Output() _productSelected: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  toggleSelectProductModal() {
    this._selectExistProductCalled.emit();
  }

  toggleCreateNewProductModal() {
    this._createNewProductCalled.emit();
  }

  toggleEditNewProductModal() {
    this._editNewProductCalled.emit();
  }

  toggleCategoryTab() {
    this._categoryTabToggled.emit();
  }

  toggleBetsHistoryModal(auction) {
    this.auction = auction;
    this._betsModalCalled.emit(this.auction);
  }

  toggleNewBetModal(auction) {
    this.auction = auction;
    this._newBetModalCalled.emit(this.auction);
  }

  refreshBets() {
    this._betsRefresh.emit();
  }

  searchTagChange(searchTag:string) {
    this._searchTagChanged.emit(searchTag);
  }

  categoryChange(category:string) {
    this._categoryChanged.emit(category);
  }

  refreshAuctionPage() {
    this._auctionTabClicked.emit();
  }

  selectProduct(product:Product) {
    this._productSelected.emit(product);
  }

}
