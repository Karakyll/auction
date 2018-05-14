import { Component, OnInit, ViewChild } from '@angular/core';
import { BetService } from '../../services/bet/bet.service';
import { Bet } from '../../models/bet';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Auction } from '../../models/auction';
import { AuctionService } from '../../services/auction/auction.service';
import { DateService } from '../../services/date/date.service';
import { InteractionService } from '../../services/interaction/interaction.service';
import { LoginService } from '../../services/login/login.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component view bets history and new bet modals
 */
@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  @ViewChild('betsModal') betsModal: ModalDirective;
  @ViewChild('newBetModal') newBetModal: ModalDirective;

  config = {
    keyboard: true,
    backdrop: false
  };

  buttonLocked:boolean = false;

  bets: Bet[];
  auction: Auction;
  newBet: number;

  unset: boolean;

  constructor(
    private interact: InteractionService,
    private betService: BetService,
    private auctionService: AuctionService,
    private dateService: DateService,
    private auth: LoginService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscribeBetsCall();
    this.subscribeNewBetCall();
  }

  hideBetsModal () {
    this.betsModal.hide();
  }

  hideNewBetModal () {
    this.newBetModal.hide();
  }

  onSubmitNewBet() {
    this.buttonLocked = true;
    let bet = new Bet(null, this.auction.id, this.auth.getUserData().userName, this.dateService.getDateTime(), this.newBet);
    this.betService.save(bet).subscribe(() => {
      this.interact.refreshBets();
      this.newBetModal.hide();
        this.buttonLocked = false;
    },
      error => {
      console.log('User or auction not found');
      console.log(error);
        this.buttonLocked = false;
      })
  }

  subscribeBetsCall() {
    this.interact._betsModalCalled.subscribe(auction => {
      this.auction = auction;
      if (auction) {
        this.betService.findByAuctionId(auction.id).subscribe(bets => {
          this.bets = bets;
        })
      }
      this.betsModal.config = this.config;
      this.betsModal.toggle();
    });
  }

  subscribeNewBetCall() {
    this.interact._newBetModalCalled.subscribe(auction => {
      this.auction = auction;
      if (auction) {
        this.betService.findByAuctionId(auction.id).subscribe(bets => {
          this.bets = bets;
          if (this.bets.length == 0 ){
            this.newBet = +(auction.product.price * 1.1).toFixed(2);
          } else {
            this.newBet = +(this.bets[this.bets.length - 1].price * 1.1).toFixed(2);
          }
        })
      }
      this.newBetModal.config = this.config;
      this.newBetModal.toggle();
    });
  }

}
