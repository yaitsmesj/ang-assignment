import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Observable } from "rxjs";
import { Article } from "../models/article.model";
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ArticleService {
    constructor (
        private apiService: ApiService
    ) {}

    query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
        const params = {};

        Object.keys(config.filters)
        .forEach((key) => {
            params[key] = config.filters[key];
        });

        return this.apiService.get(
            '/articles' + ((config.type === 'feed') ? '/feed' : ''),
            new HttpParams({ fromObject: params })
        );
    }

    get(slug): Observable<Article> {
        return this.apiService.get('/articles/' + slug)
            .pipe(map(data => data.article));
    }

    destroy(slug) {
        return this.apiService.delete('/articles/' + slug);
    }

    save(article): Observable<Article> {
        if(article.slug) {
            return this.apiService.put('/articles/' + article.slug, {article: article})
                .pipe(map(data => data.article));
        } else {
            return this.apiService.post('/articles/', {article: article})
                .pipe(map(data => data.article));
        }
    }

        favorite(slug): Observable<Article> {
            console.log('working fine');
            return this.apiService.post('/articles/' + slug + '/favorite');
        }

        unfavorite(slug): Observable<Article> {
            return this.apiService.delete('/articles/' + slug + '/favorite');
        }
    
}