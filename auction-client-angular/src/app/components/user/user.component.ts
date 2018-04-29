import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user.userName).subscribe(res => {
      this.users.splice(this.users.findIndex(u => u == user), 1);
    });
  }

  enableUser(user) {
    this.userService.enableUser(user.userName).subscribe(res => {
      this.users.find( u => u == user).enabled = true;
    });
  }

  disableUser(user) {
    this.userService.disableUser(user.userName).subscribe(res => {
      this.users.find(u => u == user).enabled = false;
    });
  }

}
