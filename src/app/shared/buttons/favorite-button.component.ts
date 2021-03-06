import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ArticleService, UserService } from "../services";
import { Router } from "@angular/router";
import { Article } from "../models";
import { concatMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html'
})
export class favoriteButtonComponent {
    constructor(
        private articleService: ArticleService,
        private router: Router,
        private userService: UserService
    ) {}

    @Input() article: Article;
    @Output() toggle = new EventEmitter<boolean>();
    isSubmitting = false;

    toggleFavorite() {
        console.log('method starts');
        this.isSubmitting = true;

        this.userService.isAuthenticated.pipe(concatMap(
            (authenticated) => {
                if(!authenticated) {
                    console.log("1st");
                    this.router.navigateByUrl('/login');
                    console.log("2nd");
                    return of(null);
                }
                console.log(this.article);
                if(!this.article.favorited) {
                    console.log('this is working');
                    return this.articleService.favorite(this.article.slug)
                        .pipe(tap(
                            data => {
                                this.isSubmitting = false;
                                this.toggle.emit(true);
                            },
                            err => this.isSubmitting = false
                        ));

                        } else {
                            console.log('else is working');

                            return this.articleService.unfavorite(this.article.slug)
                                .pipe(tap(
                                    data => {
                                        this.isSubmitting = false;
                                        this.toggle.emit(false);
                                    },
                                    err => this.isSubmitting = false
                                ));
                        }
                }
            
        )).subscribe();

    }
}