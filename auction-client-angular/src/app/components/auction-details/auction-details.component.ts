import { Component, OnInit, ViewChild } from '@angular/core';
import { Auction } from '../../models/auction';
import { AuctionService } from '../../services/auction/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bet } from '../../models/bet';
import { LoginService } from '../../services/login/login.service';
import { InteractionService } from '../../services/interaction/interaction.service';
import { BetService } from '../../services/bet/bet.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component view /auctions/:id page
 */
@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {

  @ViewChild('confirmModal') confirmModal: ModalDirective;

  config = {
    keyboard: true,
    backdrop: false
  };

  auction: Auction;
  bets: Bet[];
  finished: boolean = false;

  constructor(
    private auth: LoginService,
    private interact: InteractionService,
    private auctionService: AuctionService,
    private betService: BetService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscribeRoute();
    this.subscribeRefreshBets();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  checkOwner() {
    return this.auction ? this.auth.getUserData().userName == this.auction.owner_name : false;
  }

  showCategory(category) {
    this.router.navigate(['/auctions', {category: category}]);
  }

  clickHistory (auction) {
    this.isAuthenticated() ? this.interact.toggleBetsHistoryModal(auction) : this.router.navigateByUrl("/login");
  }

  clickNewBet(auction) {
    this.isAuthenticated() ? this.interact.toggleNewBetModal(auction) : this.router.navigateByUrl("/login");
  }

  stopAuction() {
    this.confirmModal.config = this.config;
    this.confirmModal.toggle();
  }

  confirmStopAuction() {
    this.auctionService.finishAuction(this.auction.id).subscribe(res => {
      this.auction = res;
      this.finished = res.finished;
    });
    this.confirmModal.hide();
  }

  declineStopAuction() {
    this.confirmModal.hide();
  }

  isManager() {
    return this.isAuthenticated() ? this.auth.getUserData().roles.find(r => r.role === 'ROLE_MANAGER') : false;
  }

  isAdmin() {
    return this. isAuthenticated() ? this.auth.getUserData().roles.find(r => r.role === 'ROLE_ADMIN') : false;
  }

  subscribeRefreshBets() {
    this.interact._betsRefresh.subscribe(() => {
      this.betService.getBetsByAuctionId(this.auction.id).subscribe(res => {
        if (res.length !== 0) {
          this.bets = res;
        }
      });
    })
  }

  subscribeRoute() {
    this.route.params.subscribe(params => {
      this.auctionService.getAuctionById(+params['id']).subscribe(res => {
        this.auction = res;
        this.finished = res.finished;
      });
      this.betService.getBetsByAuctionId(+params['id']).subscribe(res => {
        if (res.length !== 0) {
          this.bets = res;
        }
      });
    });
  }

}
