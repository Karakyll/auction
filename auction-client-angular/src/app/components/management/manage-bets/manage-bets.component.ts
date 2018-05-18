import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Bet} from '../../../models/bet';
import {BetService} from '../../../services/bet/bet.service';
import {InteractionService} from '../../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /management bets tab
 */
@Component({
  selector: 'app-manage-bets',
  templateUrl: './manage-bets.component.html',
  styleUrls: ['./manage-bets.component.css']
})
export class ManageBetsComponent implements OnInit, OnDestroy {

  bets: Bet[];
  modalRef: BsModalRef;
  selectedBet: Bet;

  private alive: boolean = true;

  /**
   * Constructor for manage-bets component
   * @param {InteractionService} interact
   * @param {BetService} betService
   * @param {BsModalService} modalService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private betService: BetService,
              private modalService: BsModalService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getBets();
    this.subscribeUserListChanging();
    this.subscribeProductListChanging();
    this.subscribeCategoryListChanging();
    this.subscribeAuctionListChanging();
  }

  /**
   * Get bets list
   */
  getBets() {
    this.betService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.bets = res;
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
   * Confirm deleting
   * Delete bet by id
   */
  confirmDeleteBet(): void {
    this.betService.deleteById(this.selectedBet.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.interact.callBetChanging();
        this.bets.splice(this.bets.indexOf(this.selectedBet), 1);
        this.modalRef.hide();
      });
  }

  /**
   * Decline deleting
   * Hide modal
   */
  declineDeleteBet(): void {
    this.modalRef.hide();
  }

  /**
   * Subscribe user list changing
   * If emitted- refresh bets list
   */
  subscribeUserListChanging() {
    this.interact._userListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getBets();
      })
  }

  /**
   * Subscribe products list changing
   * If emitted- refresh bets list
   */
  subscribeProductListChanging() {
    this.interact._productListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getBets();
      })
  }

  /**
   * Subscribe categories list changing
   * If emitted- refresh bets list
   */
  subscribeCategoryListChanging() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getBets();
      })
  }

  /**
   * Subscribe auctions list changing
   * If emitted- refresh bets list
   */
  subscribeAuctionListChanging() {
    this.interact._auctionListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getBets();
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
