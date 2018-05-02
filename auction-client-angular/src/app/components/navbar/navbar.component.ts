import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuctionService} from "../../services/auction/auction.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";

/**
 * Component view navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auctionService:AuctionService,
    private interact:InteractionService,
    private router:Router,
    private translate: TranslateService
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
