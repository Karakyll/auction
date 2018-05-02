import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../login/login.service";

/**
 * Service to manage routing for manager
 */
@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private auth:LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return !!this.auth.getUserData().roles.find(r => r.role == "ROLE_MANAGER");
  }

}
