import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {LoginService} from '../../services/login/login.service';
import {InteractionService} from '../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /user page
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  /**
   * Constructor for user component
   * @param {InteractionService} interact
   * @param {UserService} userService
   * @param {LoginService} auth
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private userService: UserService,
              private auth: LoginService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.user = this.auth.getUserData();
  }

  /**
   * Check is current user manager
   * @returns {Role | undefined}
   */
  isManager() {
    return this.user.roles.find(r => r.role === 'ROLE_MANAGER');
  }

  /**
   * Check is current user admin
   * @returns {Role | undefined}
   */
  isAdmin() {
    return this.user.roles.find(r => r.role === 'ROLE_ADMIN');
  }

  /**
   * Call user auctons modal
   */
  showAuctions() {
    this.interact.callUserAuctionsModal(this.user);
  }

  /**
   * Call user bets modal
   */
  showBets() {
    this.interact.callUserBetsModal(this.user);
  }

  /**
   * Call change password modal
   */
  changePassword() {
    this.interact.callPasswordChangeModal(this.user);
  }

  /**
   * Call delete account modal
   */
  deleteAccount() {
    this.interact.callDeleteAccountModal(this.user);
  }

}
