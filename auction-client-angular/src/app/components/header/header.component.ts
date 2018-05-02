import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import { TranslateService } from "@ngx-translate/core";

/**
 * Component view header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchTag:string = "";
  public isLogged:boolean = false;

  constructor(
    private auth:LoginService,
    private interact:InteractionService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated();
    this.auth._loggedChange.subscribe(res => {
      this.isLogged = res;
    })
  }

  search() {
    this.interact.searchTagChange(this.searchTag);
    this.router.navigate(["/auctions"]);
    this.searchTag = "";
  }

  clickLogin() {
    this.router.navigateByUrl("/login");
  }

  clickLogout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  clickUser() {
    this.router.navigateByUrl("/user")
  }

  changeLanguage(lang) {
    this.translate.use(lang);
  }

}
