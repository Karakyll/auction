import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /signup page
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signData = {username: '', password: '', confirm: ''};
  public userExist: boolean;
  public success: boolean = false;
  buttonLocked: boolean = false;

  private alive: boolean = true;

  /**
   * Constructor for signup component
   * @param {UserService} userService
   * @param {Router} router
   * @param {TranslateService} translate
   */
  constructor(private userService: UserService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.userExist = false;
  }

  /**
   * Handle submitting sign up form
   * Save new user
   */
  onSubmit() {
    this.buttonLocked = true;
    this.userExist = false;
    this.userService.save(new User(this.signData.username, this.signData.password, null, null))
      .takeWhile(() => this.alive)
      .subscribe(
        () => {
          this.success = true;
          this.buttonLocked = false;
        },
        () => {
          console.log('error. User already exist');
          this.userExist = true;
          this.buttonLocked = false;
        }
      )
  }

  /**
   * Navigate to main page
   */
  mainPage() {
    this.router.navigate(['/']);
  }

  /**
   * Run when component destroy.
   * Unsubscribe all subscription.
   */
  ngOnDestroy() {
    this.alive = false;
  }

}
