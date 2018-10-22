import { Component, Input } from "@angular/core";
import { ArticleService } from "../services/articles.service";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

@Component({
    selector: 'app-article-list',
    styleUrls: ['article-list.component.css'],
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
    constructor (
        private articleService: ArticleService
    ) {}

    @Input() limit: number;
    @Input()
    set config(config: ArticleListConfig) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.runQuery();
        }
    }
    results: Article[];
    loading = false;
    query: ArticleListConfig;
    currentPage = 1;
    totalPages: Array<number> = [1];

    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.results = [];

        if(this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset = (this.limit * (this.currentPage -1));
        }

        this.articleService.query(this.query)
        .subscribe(data => {
            this.loading = false;
            this.results = data.articles;

            this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
        });
    }



}