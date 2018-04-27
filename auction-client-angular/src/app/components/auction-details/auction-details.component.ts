import {Component, OnInit, TemplateRef} from '@angular/core';
import {Auction} from "../../models/auction";
import {BetService} from "../../services/bet/bet.service";
import {AuctionService} from "../../services/auction/auction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bet} from "../../models/bet";

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {

  auction:Auction;
  bets:Bet[];

  constructor(
    private betService:BetService,
    private auctionService:AuctionService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.auctionService.getAuctionById(+params['id']).subscribe(res => {
        this.auction = res;
      });
      this.betService.getBetsByAuctionId(+params['id']).subscribe(res => {
        if (res.length !== 0) {
          this.bets = res;
        }
      });
    });
    this.betService.betsRefresh.subscribe(res => {
      this.betService.getBetsByAuctionId(this.auction.id).subscribe(res => {
        if (res.length !== 0) {
          this.bets = res;
        }
      });
    })
  }

  clickHistory (auction) {
    this.betService.toggleBets(auction);
  }

  clickNewBet(auction) {
    this.betService.toggleNeBet(auction);
  }

}
