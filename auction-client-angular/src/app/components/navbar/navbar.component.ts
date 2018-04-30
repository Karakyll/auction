import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category/category.service";
import {Router} from "@angular/router";
import {AuctionService} from "../../services/auction/auction.service";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auctionService:AuctionService,
    private interact:InteractionService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  clickCategories() {
    this.interact.toggleCategoryTab();
  }

  openAuctions() {
    this.router.navigate(["/auctions", {refresh:"true"}]);
    this.interact.refreshAuctionPage();
  }

}
