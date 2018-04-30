import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
import {ModalDirective} from "ngx-bootstrap/modal";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {Auction} from "../../../models/auction";
import {Product} from "../../../models/product";
import {AuctionService} from "../../../services/auction/auction.service";
import {UserComponent} from "../user.component";
import {Bet} from "../../../models/bet";
import {BetService} from "../../../services/bet/bet.service";

@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.css']
})
export class UserOperationsComponent implements OnInit {

  @ViewChild('userAuctionsModal') userAuctionsModal: ModalDirective;
  @ViewChild('userBetsModal') userBetsModal: ModalDirective;

  user:User;
  auctions:Auction[];
  bets:Bet[];

  config = {
    keyboard: true,
    backdrop: false
  };

  constructor(
    private interact:InteractionService,
    private auctionService:AuctionService,
    private betService:BetService
  ) { }

  ngOnInit() {
    this.subscribeUserAuctionsModalCalled();
    this.subscribeUserBetsModalCalled();
  }

  subscribeUserAuctionsModalCalled() {
    this.interact._userAuctionsModalCalled.subscribe(user => {;
      this.user = user;
      this.getAuctionsList(user.userName);
      this.userAuctionsModal.config = this.config;
      this.userAuctionsModal.toggle();
    })
  }

  subscribeUserBetsModalCalled() {
    this.interact._userBetsModalCalled.subscribe(user => {
      this.user = user;
      this.getBetList(user.userName);
      this.userBetsModal.config = this.config;
      this.userBetsModal.toggle();
    })
  }

  getAuctionsList(username:string) {
    this.auctionService.getAuctionsByUserName(username).subscribe(res => {
      this.auctions = res;
    })
  }

  getBetList(username:string) {
    this.betService.getBetsByUsername(username).subscribe(res => {
      this.bets = res;
    })
  }

  hideAuctionsModal() {
    this.userAuctionsModal.hide();
  }

  hideBetsModal() {
    this.userBetsModal.hide();
  }

}
