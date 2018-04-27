import { Component, OnInit, ViewChild } from '@angular/core';
import { BetService } from "../../services/bet/bet.service";
import { Bet } from "../../models/bet";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Auction } from "../../models/auction";
import { AuctionService } from "../../services/auction/auction.service";
import { DateService } from "../../services/date/date.service";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  @ViewChild('betsModal') betsModal: ModalDirective;
  @ViewChild('newBetModal') newBetModal: ModalDirective;

  config = {
    keyboard: true,
    backdrop: false
  };

  bets:Bet[];
  auction:Auction;
  newBet:number;

  constructor(private betService:BetService, private auctionService:AuctionService, private dateService:DateService) { }

  ngOnInit() {
    this.betService.betsCall.subscribe(auction => {
      this.auction = auction;
      if (auction) {
        this.betService.getBetsByAuctionId(auction.id).subscribe(bets => {
          this.bets = bets;
        })
      }
      this.betsModal.config = this.config;
      this.betsModal.toggle();
    });
    this.betService.newBetCall.subscribe(auction => {
      this.auction = auction;
      if (auction) {
        this.betService.getBetsByAuctionId(auction.id).subscribe(bets => {
          this.bets = bets;
          if (this.bets.length == 0 ){
            this.newBet = auction.product.price * 1.1;
          } else {
            this.newBet = this.bets[this.bets.length - 1].price * 1.1;
          }
        })
      }
      this.newBetModal.config = this.config;
      this.newBetModal.toggle();
    });
  }

  hideBetsModal () {
    this.betsModal.hide();
  }

  hideNewBetModal () {
    this.newBetModal.hide();
  }

  onSubmitNewBet() {
    let bet = new Bet(null, this.auction.id, this.auction.owner_name, this.dateService.getDateTime(), this.newBet);
    this.betService.saveBet(bet).subscribe(res => {
      this.betService.refreshBets();
      this.newBetModal.hide();
    },
      error => {
      console.log("User or auction not found");
      console.log(error);
      })
  }

}
