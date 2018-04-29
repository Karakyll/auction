import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import { Auction } from "../../models/auction";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  auctions:Auction[];

  showFin:boolean = false;

  constructor(private auctionService:AuctionService, private router: Router, private route: ActivatedRoute) { }

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
    this.auctionService.searchChanged.subscribe(searchTag => {
      this.auctionService.getAuctionsProductContains(searchTag).subscribe(res => {
        this.auctions = res;
      })
    });
    this.auctionService.categoryChanged.subscribe(category => {
      this.auctionService.getAuctionsByCategory(category).subscribe(res => {
        this.auctions = res;
      })
    });
    this.auctionService.linkClicked.subscribe(res => {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
      });
    })
  }

  showFinished() {
    if (!this.showFin) {
      this.auctionService.getFinishedAuctions().subscribe(res => {
        this.auctions = res;
        this.showFin = !this.showFin;
      })
    } else {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
        this.showFin = !this.showFin;
      })
    }

  }

  deleteAuction(auction) {
    this.auctionService.deleteAuctionById(auction.id).subscribe();
  }

  saveAuction(auction) {
    this.auctionService.saveAuction(auction).subscribe();
  }

  finishAuction(auction)  {
    this.auctionService.finishAuction(auction.id).subscribe((res) => {
      console.log(res);
    })
  }

}
