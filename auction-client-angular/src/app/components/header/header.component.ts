import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {InteractionService} from '../../services/interaction/interaction.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTag: string = '';
  isLogged: boolean = false;
  isOpen = false;

  /**
   * Constructor for Header component
   * @param {LoginService} auth
   * @param {InteractionService} interact
   * @param {Router} router
   * @param {TranslateService} translate
   */
  constructor(private auth: LoginService,
              private interact: InteractionService,
              private router: Router,
              private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated();
    this.auth._loggedChange.subscribe(res => {
      this.isLogged = res;
    })
  }

  /**
   * Handle search button click
   * Navigate to auctions page with inputted search tag
   */
  search() {
    if (this.searchTag) {
      this.interact.searchTagChange(this.searchTag);
      this.router.navigate(['/auctions', {'search': this.searchTag}]);
      this.searchTag = '';
    }
  }

  /**
   * Handle click on Login button
   * Navigate to Login page
   */
  clickLogin() {
    this.router.navigateByUrl('/login');
  }

  /**
   * Handle click on Logout button
   * Logout user and navigate to login page
   */
  clickLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  /**
   * Handle click on user page button
   * Navigate to user page
   */
  clickUser() {
    this.router.navigateByUrl('/user');
  }

  /**
   * Handle changing language
   * @param lang
   */
  changeLanguage(lang) {
    this.translate.use(lang);
  }

}
