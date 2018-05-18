import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction/auction.service';
import { Auction } from '../../models/auction';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { InteractionService } from '../../services/interaction/interaction.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component view /auctions page
 */
@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {

  auctions: Auction[];

  showFin: boolean = false;

  private alive: boolean = true;

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: LoginService,
    private interact: InteractionService,
    private translate: TranslateService
  ) { }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    let search = this.route.snapshot.paramMap.get('search');
    let category = this.route.snapshot.paramMap.get('category');
    let refresh = this.route.snapshot.paramMap.get('refresh');
    if (refresh) {
      this.auctionService.findOngoing()
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      });
    }
    if (search) {
      this.auctionService.findByProductNameContains(search)
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      });
    }
    if (category) {
      this.auctionService.findByCategory(category)
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      });
    }
    this.subscribeSearchChange();
    this.subscribeCategoryChange();
    this.subscribeTabClicked();
  }

  showFinished() {
    if (!this.showFin) {
      this.auctionService.findFinished()
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
        this.showFin = true;
      })
    }
  }

  showOngoing() {
    if (this.showFin) {
      this.auctionService.findOngoing()
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
        this.showFin = false;
      });
    }
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  startNewAuction() {
    this.isAuthenticated() ? this.router.navigateByUrl('/auction/start') : this.router.navigateByUrl('/login');
  }

  subscribeSearchChange() {
    this.interact._searchTagChanged
      .takeWhile(() => this.alive)
      .subscribe(searchTag => {
      this.auctionService.findByProductNameContains(searchTag)
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeCategoryChange() {
    this.interact._categoryChanged
      .takeWhile(() => this.alive)
      .subscribe(category => {
      this.auctionService.findByCategory(category)
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeTabClicked() {
    this.interact._auctionTabClicked
      .takeWhile(() => this.alive)
      .subscribe(() => {
      this.auctionService.findOngoing()
        .takeWhile(() => this.alive)
        .subscribe(res => {
        this.auctions = res;
      });
    })
  }

  isManager() {
    return this.isAuthenticated() ? this.auth.getUserData().roles.find(r => r.role === 'ROLE_MANAGER') : false;
  }

  isAdmin() {
    return this. isAuthenticated() ? this.auth.getUserData().roles.find(r => r.role === 'ROLE_ADMIN') : false;
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
