import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import { Auction } from "../../models/auction";
import { ActivatedRoute, Router } from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  auctions:Auction[];

  showFin:boolean = false;

  constructor(
    private auctionService:AuctionService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:LoginService,
    private interact:InteractionService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    let search = this.route.snapshot.paramMap.get('search');
    let category = this.route.snapshot.paramMap.get('category');
    let refresh = this.route.snapshot.paramMap.get('refresh');
    if (refresh) {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
      });
    }
    if (search) {
      this.auctionService.getAuctionsProductContains(search).subscribe(res => {
        this.auctions = res;
      });
    }
    if (category) {
      this.auctionService.getAuctionsByCategory(category).subscribe(res => {
        this.auctions = res;
      });
    }
    this.subscribeSearchChange();
    this.subscribeCategoryChange();
    this.subscribeLinkClicked();
  }

  showFinished() {
    if (!this.showFin) {
      this.auctionService.getFinishedAuctions().subscribe(res => {
        this.auctions = res;
        this.showFin = true;
      })
    }
  }

  showOngoing() {
    if (this.showFin) {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
        this.showFin = false;
      });
    }
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  startNewAuction() {
    this.isAuthenticated() ? this.router.navigateByUrl("/auction/start") : this.router.navigateByUrl("/login");
  }

  subscribeSearchChange() {
    this.interact._searchTagChanged.subscribe(searchTag => {
      this.auctionService.getAuctionsProductContains(searchTag).subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeCategoryChange() {
    this.interact._categoryChanged.subscribe(category => {
      this.auctionService.getAuctionsByCategory(category).subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeLinkClicked() {
    this.interact._auctionTabClicked.subscribe(res => {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
      });
    })
  }

}
