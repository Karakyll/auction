import { Component, OnInit } from '@angular/core';
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
export class AuctionComponent implements OnInit {

  auctions: Auction[];

  showFin: boolean = false;

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: LoginService,
    private interact: InteractionService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    let search = this.route.snapshot.paramMap.get('search');
    let category = this.route.snapshot.paramMap.get('category');
    let refresh = this.route.snapshot.paramMap.get('refresh');
    if (refresh) {
      this.auctionService.findOngoing().subscribe(res => {
        this.auctions = res;
      });
    }
    if (search) {
      this.auctionService.findByProductNameContains(search).subscribe(res => {
        this.auctions = res;
      });
    }
    if (category) {
      this.auctionService.findByCategory(category).subscribe(res => {
        this.auctions = res;
      });
    }
    this.subscribeSearchChange();
    this.subscribeCategoryChange();
    this.subscribeTabClicked();
  }

  showFinished() {
    if (!this.showFin) {
      this.auctionService.findFinished().subscribe(res => {
        this.auctions = res;
        this.showFin = true;
      })
    }
  }

  showOngoing() {
    if (this.showFin) {
      this.auctionService.findOngoing().subscribe(res => {
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
    this.interact._searchTagChanged.subscribe(searchTag => {
      this.auctionService.findByProductNameContains(searchTag).subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeCategoryChange() {
    this.interact._categoryChanged.subscribe(category => {
      this.auctionService.findByCategory(category).subscribe(res => {
        this.auctions = res;
      })
    });
  }

  subscribeTabClicked() {
    this.interact._auctionTabClicked.subscribe(() => {
      this.auctionService.findOngoing().subscribe(res => {
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

}
