import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

/**
 * Component view /signup page
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signData = {username: "", password: "", confirm: ""};
  public userExist:boolean;
  public success:boolean = false;
  buttonLocked:boolean = false;

  constructor(
    private userService:UserService,
    private router:Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.userExist = false;
  }

  onSubmit() {
    this.buttonLocked = true;
    this.userExist = false;
    this.userService.saveUser(new User(this.signData.username, this.signData.password, null, null)).subscribe(
      res => {
        this.success = true;
        this.buttonLocked = false;
      },
      err => {
        console.log("error. User already exist");
        this.userExist = true;
        this.buttonLocked = false;
      }
    )
  }

  mainPage() {
    this.router.navigate(["/"]);
  }

}
