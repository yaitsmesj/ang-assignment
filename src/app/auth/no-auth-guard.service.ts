import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../shared";
import { Observable } from "rxjs";
import { map ,  take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
    }
}