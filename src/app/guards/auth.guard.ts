import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(public router: Router, public authenService: AuthService) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<any> {
        const user = this.authenService.getUserInfo();
        console.log(user);
        if (!user) {
            this.login();
            return false;
        }
        return true;
    }
    login() {
        this.router.navigate(['/login']);
    }

}
