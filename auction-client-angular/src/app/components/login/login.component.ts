import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component view /login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {username: '', password: ''};
  isFailed: boolean = false;
  buttonLocked: boolean = false;

  constructor(
    private auth: LoginService,
    private router: Router,
    private translate: TranslateService
  ){}

  ngOnInit(){
  }

  login() {
    this.buttonLocked = true;
    this.auth.loginUser(this.loginData);
    //this.auth.test(this.loginData);
    this.subscribeLoggedChange();
    this.subscribeOnLoginError();
  }

  subscribeLoggedChange() {
    this.auth._loggedChange.subscribe(res => {
      this.router.navigateByUrl('/');
      this.buttonLocked = res;
      this.isFailed = false;
    })
  }

  subscribeOnLoginError() {
    this.auth._loginError.subscribe(() => {
      this.buttonLocked = false;
      this.isFailed = true;
    })
  }

}
