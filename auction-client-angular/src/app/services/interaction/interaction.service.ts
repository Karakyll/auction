import { EventEmitter, Injectable, Output } from '@angular/core';
import { Auction } from '../../models/auction';
import { Product } from '../../models/product';
import { User } from '../../models/user';

/**
 * Service to allow interactions between components
 */
@Injectable()
export class InteractionService {

  @Output() _selectExistProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _createNewProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _editNewProductCalled: EventEmitter<any> = new EventEmitter();

  @Output() _categoryTabToggled: EventEmitter<any> = new EventEmitter();

  @Output() _betsModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() _newBetModalCalled: EventEmitter<Auction> = new EventEmitter();
  @Output() _betsRefresh: EventEmitter<any> = new EventEmitter();

  @Output() _searchTagChanged: EventEmitter<string> = new EventEmitter();
  @Output() _categoryChanged: EventEmitter<string> = new EventEmitter();
  @Output() _auctionTabClicked: EventEmitter<any> = new EventEmitter();

  @Output() _productSelected: EventEmitter<Product> = new EventEmitter();

  @Output() _userAuctionsModalCalled: EventEmitter<User> = new EventEmitter();
  @Output() _userBetsModalCalled: EventEmitter<User> = new EventEmitter();
  @Output() _passwordChangeModalCalled: EventEmitter<User> = new EventEmitter();
  @Output() _deleteAccountModalCalled: EventEmitter<User> = new EventEmitter();

  @Output() _categoryListChanged: EventEmitter<any> = new EventEmitter();
  @Output() _productListChanged: EventEmitter<any> = new EventEmitter();
  @Output() _userListChanged: EventEmitter<any> = new EventEmitter();
  @Output() _betListChanged: EventEmitter<any> = new EventEmitter();
  @Output() _auctionListChanged: EventEmitter<any> = new EventEmitter();

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
    this._betsModalCalled.emit(auction);
  }

  toggleNewBetModal(auction) {
    this._newBetModalCalled.emit(auction);
  }

  refreshBets() {
    this._betsRefresh.emit();
  }

  searchTagChange(searchTag: string) {
    this._searchTagChanged.emit(searchTag);
  }

  categoryChange(category: string) {
    this._categoryChanged.emit(category);
  }

  refreshAuctionPage() {
    this._auctionTabClicked.emit();
  }

  selectProduct(product: Product) {
    this._productSelected.emit(product);
  }

  callUserAuctionsModal(user: User) {
    this._userAuctionsModalCalled.emit(user);
  }

  callUserBetsModal(user: User) {
    this._userBetsModalCalled.emit(user);
  }

  callPasswordChangeModal(user: User) {
    this._passwordChangeModalCalled.emit(user);
  }

  callDeleteAccountModal(user: User) {
    this._deleteAccountModalCalled.emit(user);
  }

  callCategoryChanging() {
    this._categoryListChanged.emit();
  }

  callProductChanging() {
    this._productListChanged.emit();
  }

  callUserChanging() {
    this._userListChanged.emit();
  }

  callBetChanging() {
    this._betListChanged.emit();
  }

  callAuctionChanging() {
    this._auctionListChanged.emit();
  }
}
