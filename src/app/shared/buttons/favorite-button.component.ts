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
        this.isSubmitting = true;

        this.userService.isAuthenticated.pipe(concatMap(
            (authenticated) => {
                if(!authenticated) {
                    this.router.navigateByUrl('/login');
                    return of(null);
                }

                if(!this.article.favorited) {
                    return this.articleService.favorite(this.article.slug)
                        .pipe(tap(
                            data => {
                                this.isSubmitting = false;
                                this.toggle.emit(true);
                            },
                            err => this.isSubmitting = false
                        ));

                        } else {
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