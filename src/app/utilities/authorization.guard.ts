import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({ providedIn : 'root'})
export class AuthorizationGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService)  {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const actualUser = this.authenticationService.currentUserData;
        if (actualUser) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}