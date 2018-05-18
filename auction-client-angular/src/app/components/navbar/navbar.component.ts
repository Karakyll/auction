import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuctionService} from '../../services/auction/auction.service';
import {InteractionService} from '../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * Constructor for navbar component
   * @param {AuctionService} auctionService
   * @param {InteractionService} interact
   * @param {Router} router
   * @param {TranslateService} translate
   */
  constructor(private auctionService: AuctionService,
              private interact: InteractionService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
  }

  /**
   * Toggle category tab
   */
  clickCategories() {
    this.interact.toggleCategoryTab();
  }

  /**
   * Navigate to auctions page
   */
  openAuctions() {
    this.router.navigate(['/auctions', {refresh: 'true'}]);
    this.interact.clickAuctionTab();
  }

}
