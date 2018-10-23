import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Comment, UserService, User } from "../shared";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-article-comment',
    templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
    constructor(
        private userService: UserService
    ) {}

    private subscription: Subscription;

    @Input() comment: Comment;
    @Output() deleteComment = new EventEmitter<boolean>();

    canModify: boolean;

    ngOnInit() {
        this.subscription = this.userService.currentUser.subscribe(
            (userData: User) => {
                this.canModify = (userData.username === this.comment.author.username);
            }
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    deleteClicked() {
        this.deleteComment.emit(true);
    }
}