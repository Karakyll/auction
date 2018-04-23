import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import { Auction } from "../../models/auction";


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  auctions:Auction[];

  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.auctionService.getAllAuctions().subscribe((res) => {
      this.auctions = res;
    });
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
