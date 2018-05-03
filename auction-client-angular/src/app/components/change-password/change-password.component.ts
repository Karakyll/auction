import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InteractionService } from '../../services/interaction/interaction.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('changePasswordModal') changePasswordModal: ModalDirective;

  user:User;

  public passwords = {password: '', confirm: ''};

  config = {
    keyboard: true,
    backdrop: false
  };

  constructor(
    private interact: InteractionService,
    private userService: UserService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscribePasswordChangeModalCalled();
  }

  subscribePasswordChangeModalCalled() {
    this.interact._passwordChangeModalCalled.subscribe(user => {
      this.user = user;
      this.changePasswordModal.config = this.config;
      this.changePasswordModal.toggle();
    })
  }

  hidePasswordModal() {
    this.changePasswordModal.hide();
  }

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

}
