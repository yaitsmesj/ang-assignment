import { Injectable } from "@angular/core";
import { Article, ArticleService, UserService } from "../shared";
import { Router,Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ArticleResolver implements Resolve<Article> {
    constructor(
        private articlesService: ArticleService,
        private router: Router,
        private userService: UserService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.articlesService.get(route.params['slug'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}