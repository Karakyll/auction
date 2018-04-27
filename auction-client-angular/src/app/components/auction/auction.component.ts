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

  constructor(private auctionService:AuctionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('search');
    if (!param) {
      this.auctionService.getOngoingAuctions().subscribe(res => {
        this.auctions = res;
      });
    } else {
      this.auctionService.getAuctionsProductContains(param).subscribe(res => {
        this.auctions = res;
      });
    }
    this.auctionService.search.subscribe(searchTag => {
      this.auctionService.getAuctionsProductContains(searchTag).subscribe(res => {
        this.auctions = res;
      })
    })

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
