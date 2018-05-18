import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Bet } from '../../../models/bet';
import { BetService } from '../../../services/bet/bet.service';
import { InteractionService } from '../../../services/interaction/interaction.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private interact: InteractionService,
    private betService: BetService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

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

  getBets() {
    this.betService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
      this.bets = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteBet(): void {
    this.betService.deleteById(this.selectedBet.id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.interact.callBetChanging();
      this.bets.splice(this.bets.indexOf(this.selectedBet),1);
      this.modalRef.hide();
    });
  }

  declineDeleteBet(): void {
    this.modalRef.hide();
  }

  subscribeUserListChanging() {
    this.interact._userListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getBets();
    })
  }

  subscribeProductListChanging() {
    this.interact._productListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getBets();
    })
  }

  subscribeCategoryListChanging() {
    this.interact._categoryListChanged
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.getBets();
    })
  }

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
