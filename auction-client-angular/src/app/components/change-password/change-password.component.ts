import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {InteractionService} from '../../services/interaction/interaction.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  @ViewChild('changePasswordModal') changePasswordModal: ModalDirective;

  user: User;

  public passwords = {password: '', confirm: ''};

  private alive: boolean = true;

  config = {
    keyboard: true,
    backdrop: false
  };

  /**
   * Constructor for Change-password component
   * @param {InteractionService} interact
   * @param {UserService} userService
   * @param {TranslateService} translate
   */
  constructor(private interact: InteractionService,
              private userService: UserService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribePasswordChangeModalCalled();
  }

  /**
   * Subscribe password change modal called
   * If emitted - toggle password change modal
   */
  subscribePasswordChangeModalCalled() {
    this.interact._passwordChangeModalCalled
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
        this.changePasswordModal.config = this.config;
        this.changePasswordModal.toggle();
      })
  }

  /**
   * Hide password change modal
   */
  hidePasswordChangeModal() {
    this.changePasswordModal.hide();
  }

  /**
   * Handle submitting password change message
   * Change user password
   */
  onSubmitPasswordChange() {
    this.userService.changePassword(
      new User(
        this.user.userName,
        this.passwords.password,
        true,
        this.user.roles
      )).subscribe(() => {
      this.changePasswordModal.hide();
    })
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
