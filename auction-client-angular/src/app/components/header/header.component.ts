import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchTag:string = "";
  public isLogged:boolean = false;

  constructor(
    private loginService:LoginService,
    private auctionService:AuctionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogged = this.loginService.isAuthenticated();
    this.loginService.loggedChange.subscribe(res => {
      this.isLogged = res;
    })
  }

  search() {
    this.router.navigate(["/auctions", {search: this.searchTag}]);
    this.auctionService.searchTagChange(this.searchTag);
    this.searchTag = "";
  }

  clickLogin() {
    this.router.navigateByUrl("/login");
  }

  clickLogout() {
    this.loginService.logout();
  }

  clickUser() {
    this.router.navigateByUrl("/user")
  }

}
