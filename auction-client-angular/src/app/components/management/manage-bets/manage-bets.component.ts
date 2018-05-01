import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Bet} from "../../../models/bet";
import {BetService} from "../../../services/bet/bet.service";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-manage-bets',
  templateUrl: './manage-bets.component.html',
  styleUrls: ['./manage-bets.component.css']
})
export class ManageBetsComponent implements OnInit {

  bets:Bet[];
  modalRef:BsModalRef;
  selectedBet:Bet;

  constructor(
    private interact:InteractionService,
    private betService:BetService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getBets();
    this.subscribeUserListChanging();
    this.subscribeProductListChanging();
    this.subscribeCategoryListChanging();
    this.subscribeAuctionListChanging();
  }

  getBets() {
    this.betService.getAllBets().subscribe(res => {
      this.bets = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteBet(): void {
    this.betService.deleteBet(this.selectedBet.id).subscribe(res => {
      this.interact.callBetChanging();
      this.bets.splice(this.bets.indexOf(this.selectedBet),1);
      this.modalRef.hide();
    });
  }

  declineDeleteBet(): void {
    this.modalRef.hide();
  }

  subscribeUserListChanging() {
    this.interact._userListChanged.subscribe(res => {
      this.getBets();
    })
  }

  subscribeProductListChanging() {
    this.interact._productListChanged.subscribe(res => {
      this.getBets();
    })
  }

  subscribeCategoryListChanging() {
    this.interact._categoryListChanged.subscribe(res => {
      this.getBets();
    })
  }

  subscribeAuctionListChanging() {
    this.interact._auctionListChanged.subscribe(res => {
      this.getBets();
    })
  }

}
