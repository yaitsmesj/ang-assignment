import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CommentsService {
    constructor (
        private apiService: ApiService
    ) {}

    add(slug,payload): Observable<Comment> {
        return this.apiService
            .post(
                `/articles/${slug}/comment`,
                {
                    comment: { body: payload }
                }
            ).pipe(map(data => data.comment));
    }
    getAll(slug): Observable<Comment[]> {
        return this.apiService.get(`/articles/${slug}/comments`)
            .pipe(map(data => data.comments));
    }
    destroy(commentId, articleSlug) {
        return this.apiService
            .delete(`/articles/${articleSlug}/comments/${commentId}`);
    }
}