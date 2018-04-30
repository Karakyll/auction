import {Component, OnInit, TemplateRef} from '@angular/core';
import {Auction} from "../../models/auction";
import {AuctionService} from "../../services/auction/auction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bet} from "../../models/bet";
import {LoginService} from "../../services/login/login.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {BetService} from "../../services/bet/bet.service";

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {

  auction:Auction;
  bets:Bet[];

  constructor(
    private auth:LoginService,
    private interact:InteractionService,
    private auctionService:AuctionService,
    private betService:BetService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscribeRoute();
    this.subscribeRefreshBets();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  showCategory(category) {
    this.router.navigate(["/auctions", {category: category}]);
  }

  clickHistory (auction) {
    this.interact.toggleBetsHistoryModal(auction);
  }

  clickNewBet(auction) {
    this.isAuthenticated() ? this.interact.toggleNewBetModal(auction) : this.router.navigateByUrl("/login");
  }

  subscribeRefreshBets() {
    this.interact._betsRefresh.subscribe(res => {
      this.betService.getBetsByAuctionId(this.auction.id).subscribe(res => {
        if (res.length !== 0) {
          this.bets = res;
        }
      });
    })
  }

  subscribeRoute() {
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
  }

}
