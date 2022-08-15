import { AlertService } from './../services/alert.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanLoad {

  constructor(private auth: AuthService,
              private AlertService: AlertService,
              private router: Router) {}
    
              canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.auth.isAdmin()) {
            return true;
          } else {
              this.AlertService.sendAlert("Not Admin");
              this.router.navigate(['']);
              return false;
          }
    }

}
