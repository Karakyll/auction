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
    })
  }

  deleteUser(user) {
    this.userService.deleteUser(user.userName).subscribe();
  }

  saveUser(user) {
    console.log("call save");
    console.log(user)
  }

  enableUser(user) {
    this.userService.enableUser(user.userName).subscribe();
  }

  disableUser(user) {
    this.userService.disableUser(user.userName).subscribe();
  }

}
