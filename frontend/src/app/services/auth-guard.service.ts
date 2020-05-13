import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn();
    // console.log('current user ',currentUser)
    // if (currentUser) {
    //   // check if route is restricted by role
    //   if (!currentUser['token']) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    //   // authorised so return true
    //   return true;
    // }
  }
}
