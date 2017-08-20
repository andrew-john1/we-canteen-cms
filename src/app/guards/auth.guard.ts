import {Injectable} from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras
} from '@angular/router';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,
                private router: Router) {
        console.log('auth guard: constructor');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('auth guard: can active child');
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        console.log('auth guard: check login');
        console.log('redirect url', url);

        if (this.authService.isLoggedIn || localStorage.getItem('token')) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
    }
}
