import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signData = {username: "", password: "", confirm: ""};

  public userExist:boolean;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.userExist = false;
  }

  onSubmit() {
    this.userExist = false;
    this.userService.saveUser(new User(this.signData.username, this.signData.password, null, null)).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        console.log("error. User already exist");
        this.userExist = true;
      }
    )
  }

}
