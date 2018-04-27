import {Component, OnInit, ViewChild} from '@angular/core';
import {BetService} from "../../services/bet/bet.service";
import {Bet} from "../../models/bet";
import { ModalDirective } from 'ngx-bootstrap/modal';
import {Auction} from "../../models/auction";
import {AuctionService} from "../../services/auction/auction.service";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  @ViewChild('betsModal') childModal: ModalDirective;

  config = {
    keyboard: true
  };

  bets:Bet[];

  auction:Auction;

  constructor(private betService:BetService, private auctionService: AuctionService) { }

  ngOnInit() {
    this.betService.getAllBets().subscribe(res => {
      this.bets = res;
    });
    this.betService.change.subscribe(bets => {
      this.bets = bets;
      if (bets) {
        this.auctionService.getAuctionById(bets[0].auction_id).subscribe(res => {
          this.auction = res;
        })
      }
      this.childModal.toggle();
    })
  }

  deleteBet(bet) {
    console.log("call delete");
    this.betService.deleteBet(bet.id).subscribe();
    console.log(bet);
  }

  saveBet(bet) {
    console.log("call save");
    this.betService.saveBet(bet).subscribe(res => {
      console.log(res);
    })

  }

}
