import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {TranslateService} from '@ngx-translate/core';
import {InteractionService} from '../../services/interaction/interaction.service';

/**
 * Component view /administration page
 */
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit, OnDestroy {

  users: User[];
  modalRef: BsModalRef;
  selectedUser: User;

  private alive: boolean = true;

  /**
   * Constructor for Administration component
   * @param {InteractionService} interact
   * @param {UserService} userService
   * @param {BsModalService} modalService
   * @param {TranslateService} translate
   */
  constructor(public interact: InteractionService,
              private userService: UserService,
              private modalService: BsModalService,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.getUsers();
  }

  /**
   * Subscribe to getting user list
   */
  getUsers() {
    this.userService.findAll()
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.users = res;
      })
  }

  /**
   * Open confirm modal to delete user
   * @param {TemplateRef<any>} template
   */
  openConfirmModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Confirm deleting user.
   */
  confirmDelete(): void {
    this.userService.deleteUser(this.selectedUser.userName)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.users.splice(this.users.indexOf(this.selectedUser), 1);
        this.modalRef.hide();
      });
  }

  /**
   * Decline deleting user.
   * Hide confirm modal
   */
  declineDelete(): void {
    this.modalRef.hide();
  }

  /**
   * Subscribe to user enable
   * If success - change user status
   * @param {User} user - enabled user
   */
  enableUser(user: User) {
    this.userService.enable(user.userName)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.users[this.users.indexOf(user)] = res;
      })
  }

  /**
   * Subscribe to user disable
   * If success - change user status
   * @param {User} user - disabled user
   */
  disableUser(user: User) {
    this.userService.disable(user.userName)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.users[this.users.indexOf(user)] = res;
      })
  }

  /**
   * Subscribe to user promote
   * If success - change user role
   * @param {User} user - promoted user
   */
  promoteUser(user: User) {
    this.userService.promote(user.userName)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.users[this.users.indexOf(user)] = res;
      })
  }

  /**
   * Subscribe to demote user
   * If success - change user role
   * @param {User} user - demoted user
   */
  demoteUser(user: User) {
    this.userService.demote(user.userName)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.users[this.users.indexOf(user)] = res;
      })
  }

  /**
   * Call change password component
   * @param user
   */
  changePassword(user) {
    this.interact.callPasswordChangeModal(user);
  }

  /**
   * Check is current user manager
   * @param {User} user - checked user
   * @returns {Role | undefined} true | false
   */
  static isManager(user: User) {
    return user.roles.find(r => r.role == 'ROLE_MANAGER');
  }

  /**
   * Check is current user admin
   * @param {User} user - checked user
   * @returns {Role | undefined} true | false
   */
  static isAdmin(user: User) {
    return user.roles.find(r => r.role == 'ROLE_ADMIN');
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
