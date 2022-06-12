import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (this.auth.isAuthenticated()) {
      if (this.isLoginOrRegister(state.url)) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else if (this.isLoginOrRegister(state.url)) {
      return true;
    }

    this.router.navigate(['/auth/login', {M: "NO_AUTH"}]);
    return false;
  }

  isLoginOrRegister(url: string): boolean {
    if (url.includes('login') || url.includes('register')) {
      return true;
    }

    return false;
  }
}
