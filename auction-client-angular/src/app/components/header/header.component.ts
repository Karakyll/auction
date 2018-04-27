import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchTag:string = "";

  constructor(
    private auctionService:AuctionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  search() {
    this.router.navigate(["/auctions", {search: this.searchTag}]);
    this.auctionService.searchTagChange(this.searchTag);
    this.searchTag = "";
  }

}
