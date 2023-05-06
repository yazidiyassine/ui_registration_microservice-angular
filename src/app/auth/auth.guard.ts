import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  // Inject the UserAuthService into the CanActivateFn
  const userAuthService: UserAuthService = inject(UserAuthService);
  // Inject the UserService into the CanActivateFn
  const userService: UserService = inject(UserService);
  // Inject the Router into the CanActivateFn
  const router: Router = inject(Router);

  if (userAuthService.getToken() !== null) {
  // Check if the token is not null
  if (userAuthService.getToken()!== null) {
    // Get the roles from the route data
    const role = route.data['roles'] as Array<string>;

    // Check if the roles are defined
    if (role) {
      // Check if the user has the role
      const match = userService.roleMatch(role);
      // If the user has the role, return true
      if (match) {
        return true;
      // If the user does not have the role, redirect to the forbidden page
      }else{
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }
  }

  // If the token is null, redirect to the login page
  router.navigate(['/login']);
  return false;

}
/* import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = this.userService.roleMatch(role);
        if (match) {
          return true;
        }else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
 */
