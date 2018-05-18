import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {InteractionService} from '../../../services/interaction/interaction.service';
import {Auction} from '../../../models/auction';
import {AuctionService} from '../../../services/auction/auction.service';
import {Bet} from '../../../models/bet';
import {BetService} from '../../../services/bet/bet.service';
import {UserService} from '../../../services/user/user.service';
import {LoginService} from '../../../services/login/login.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /user operations modals
 */
@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.css']
})
export class UserOperationsComponent implements OnInit, OnDestroy {

  @ViewChild('userAuctionsModal') userAuctionsModal: ModalDirective;
  @ViewChild('userBetsModal') userBetsModal: ModalDirective;
  @ViewChild('changePasswordModal') changePasswordModal: ModalDirective;
  @ViewChild('confirmDeleteModal') confirmDeleteModal: ModalDirective;

  user: User;
  auctions: Auction[];
  bets: Bet[];

  unset;
  private alive: boolean = true;

  config = {
    keyboard: true,
    backdrop: false
  };

  /**
   * Constructor for user-operations component
   * @param {InteractionService} interact
   * @param {AuctionService} auctionService
   * @param {BetService} betService
   * @param {UserService} userService
   * @param {LoginService} auth
   * @param {Router} router
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private auctionService: AuctionService,
              private betService: BetService,
              private userService: UserService,
              private auth: LoginService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeUserAuctionsModalCalled();
    this.subscribeUserBetsModalCalled();
    this.subscribeDeleteAccountModalCalled();
  }

  /**
   * Subscribe user auctions modal called
   * If emitted - toggle user auctions modal
   */
  subscribeUserAuctionsModalCalled() {
    this.interact._userAuctionsModalCalled
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
        this.getAuctionsList(user.userName);
        this.userAuctionsModal.config = this.config;
        this.userAuctionsModal.toggle();
      })
  }

  /**
   * Subscribe user bets modal called
   * If emitted - toggle user bets modal
   */
  subscribeUserBetsModalCalled() {
    this.interact._userBetsModalCalled
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
        this.getBetList(user.userName);
        this.userBetsModal.config = this.config;
        this.userBetsModal.toggle();
      })
  }

  /**
   * Subscribe delete account modal called
   * If emitted - toggle delete account modal
   */
  subscribeDeleteAccountModalCalled() {
    this.interact._deleteAccountModalCalled
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
        this.confirmDeleteModal.config = this.config;
        this.confirmDeleteModal.toggle();
      })
  }

  /**
   * Get auctions list
   * @param {string} username
   */
  getAuctionsList(username: string) {
    this.auctionService.findByUserName(username)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.auctions = res;
      });
  }

  /**
   * Get bets list
   * @param {string} username
   */
  getBetList(username: string) {
    this.betService.findByUsername(username)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.bets = res;
      });
  }

  /**
   * Hide auctions modal
   */
  hideAuctionsModal() {
    this.userAuctionsModal.hide();
  }

  /**
   * Hide bets modal
   */
  hideBetsModal() {
    this.userBetsModal.hide();
  }

  /**
   * Confirm deleting user
   * Delete user
   */
  confirmDeleteUser() {
    this.userService.deleteUser(this.user.userName)
      .takeWhile(() => this.alive)
      .subscribe(() => {
      });
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  /**
   * Decline deleting user
   * Hide modal
   */
  declineDeleteUser() {
    this.confirmDeleteModal.hide();
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
