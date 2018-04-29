import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from "../login/login.service";

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor(private auth:LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    console.log("in guard");
    console.log(this.auth.isAuthenticated());
    return this.auth.isAuthenticated();
  }

}
