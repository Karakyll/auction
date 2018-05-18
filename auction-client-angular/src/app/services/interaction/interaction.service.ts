import {EventEmitter, Injectable, Output} from '@angular/core';
import {Auction} from '../../models/auction';
import {Product} from '../../models/product';
import {User} from '../../models/user';

/**
 * Service to allow interactions between components
 */
@Injectable()
export class InteractionService {

  @Output() _selectExistProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _createNewProductCalled: EventEmitter<any> = new EventEmitter();
  @Output() _editNewProductCalled: EventEmitter<any> = new EventEmitter();

  @Output() _categoryTabToggled: EventEmitter<any> = new EventEmitter();

  @Output() _betsHistoryModalCalled: EventEmitter<Auction> = new EventEmitter();
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

  /**
   * Constructor for interaction seervice
   */
  constructor() {
  }

  /**
   * Toggle select product modal
   */
  toggleSelectProductModal() {
    this._selectExistProductCalled.emit();
  }

  /**
   * Toggle create product modal
   */
  toggleCreateNewProductModal() {
    this._createNewProductCalled.emit();
  }

  /**
   * Toggle edit new product modal
   */
  toggleEditNewProductModal() {
    this._editNewProductCalled.emit();
  }

  /**
   * Toggle category tab
   */
  toggleCategoryTab() {
    this._categoryTabToggled.emit();
  }

  /**
   * Toggle bets history modal
   * @param auction
   */
  toggleBetsHistoryModal(auction) {
    this._betsHistoryModalCalled.emit(auction);
  }

  /**
   * Thoggle new bet modal
   * @param auction
   */
  toggleNewBetModal(auction) {
    this._newBetModalCalled.emit(auction);
  }

  /**
   * Refresh bets list
   */
  refreshBets() {
    this._betsRefresh.emit();
  }

  /**
   * Search tag change
   * @param {string} searchTag
   */
  searchTagChange(searchTag: string) {
    this._searchTagChanged.emit(searchTag);
  }

  /**
   * Category change
   * @param {string} category
   */
  categoryChange(category: string) {
    this._categoryChanged.emit(category);
  }

  /**
   * Auction tab click
   */
  clickAuctionTab() {
    this._auctionTabClicked.emit();
  }

  /**
   * Select product
   * @param {Product} product
   */
  selectProduct(product: Product) {
    this._productSelected.emit(product);
  }

  /**
   * Call user auctions modal
   * @param {User} user
   */
  callUserAuctionsModal(user: User) {
    this._userAuctionsModalCalled.emit(user);
  }

  /**
   * Call user bets modal
   * @param {User} user
   */
  callUserBetsModal(user: User) {
    this._userBetsModalCalled.emit(user);
  }

  /**
   * Call password change modal
   * @param {User} user
   */
  callPasswordChangeModal(user: User) {
    this._passwordChangeModalCalled.emit(user);
  }

  /**
   * Call delete account modal
   * @param {User} user
   */
  callDeleteAccountModal(user: User) {
    this._deleteAccountModalCalled.emit(user);
  }

  /**
   * Call category changing
   */
  callCategoryChanging() {
    this._categoryListChanged.emit();
  }

  /**
   * Call product changing
   */
  callProductChanging() {
    this._productListChanged.emit();
  }

  /**
   * Call user changing
   */
  callUserChanging() {
    this._userListChanged.emit();
  }

  /**
   * Call bet changing
   */
  callBetChanging() {
    this._betListChanged.emit();
  }

  /**
   * Call auction changing
   */
  callAuctionChanging() {
    this._auctionListChanged.emit();
  }
}
