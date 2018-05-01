import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../login/login.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth:LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return !!this.auth.getUserData().roles.find(r => r.role == "ROLE_ADMIN");
  }

}
