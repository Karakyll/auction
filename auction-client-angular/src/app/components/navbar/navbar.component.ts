import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import {Router} from "@angular/router";
import {AuctionService} from "../../services/auction/auction.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auctionService:AuctionService, private categoryService:CategoryService, private router:Router) { }

  ngOnInit() {
  }

  clickCategories() {
    this.categoryService.toggle();
  }

  openAuctions() {
    this.router.navigate(["/auctions", {refresh:"true"}]);
    this.auctionService.refreshAuctionPage();
  }

}
