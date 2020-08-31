import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {loggedIn} from "@angular/fire/auth-guard";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user),
        tap(loggedIn => {
          if(!loggedIn) {
            this.router.navigate(['/auth'])
            return false;
          }
        })
    );
  }
}
