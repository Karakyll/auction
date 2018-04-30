import { Component, OnInit } from '@angular/core';
import { AuctionService } from "../../services/auction/auction.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {InteractionService} from "../../services/interaction/interaction.service";

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
    private interact:InteractionService,
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
    this.interact.searchTagChange(this.searchTag);
    this.searchTag = "";
  }

  clickLogin() {
    this.router.navigateByUrl("/login");
  }

  clickLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

  clickUser() {
    this.router.navigateByUrl("/user")
  }

}
