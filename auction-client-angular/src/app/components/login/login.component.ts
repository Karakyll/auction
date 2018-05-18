import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginData = {username: '', password: ''};
  isFailed: boolean = false;
  buttonLocked: boolean = false;
  private alive: boolean = true;

  /**
   * Constructor for Login component.
   * @param {LoginService} auth - authorization service
   * @param {Router} router - router service
   * @param {TranslateService} translate - translate service
   */
  constructor(private auth: LoginService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.subscribeLoggedChange();
    this.subscribeOnLoginError();
  }

  /**
   * Login user with user data.
   * Use this in production mode.
   */
  login() {
    this.buttonLocked = true;
    this.auth.loginUser(this.loginData);
  }

  /**
   * Login with mocked test data.
   * Use this to debug and develop.
   */
  // login() {
  //   this.buttonLocked = true;
  //   this.auth.test(this.loginData);
  // }

  /**
   * Subscribe to logged status changing.
   * Logged status change if log in complete successfully
   */
  subscribeLoggedChange() {
    this.auth._loggedChange
      .takeWhile(() => this.alive)
      .subscribe(res => {
        this.router.navigateByUrl('/');
        this.buttonLocked = res;
        this.isFailed = false;
      })
  }

  /**
   * Subscribe to log in error
   */
  subscribeOnLoginError() {
    this.auth._loginError
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.buttonLocked = false;
        this.isFailed = true;
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
