import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/login.service';

/**
 * Service to manage routing for admin
 */
@Injectable()
export class AdminGuard implements CanActivate {

  /**
   * Constructor for admin-guard service
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
    return !!this.auth.getUserData().roles.find(r => r.role === 'ROLE_ADMIN');
  }

}
