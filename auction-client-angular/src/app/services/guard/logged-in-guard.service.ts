import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/login.service';

/**
 * Service to manage routing for loggined users
 */
@Injectable()
export class LoggedInGuard implements CanActivate {

  /**
   * Constructor for logged-in-guard service
   * @param {LoginService} auth
   */
  constructor(private auth: LoginService) {
  }

  /**
   * Check if current user can activate routing
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.auth.isAuthenticated();
  }

}
