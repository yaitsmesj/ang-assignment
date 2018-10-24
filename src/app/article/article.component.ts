import { Component, OnInit } from "@angular/core";
import { Article, User, ArticleService, UserService } from "../shared";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentsService } from "../shared/services/comments.service";

@Component({
    selector: 'app-article-page',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    article: Article;
    currentUser: User;
    canModify: boolean;
    comments: Comment[];
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    isDeleting = false;

    constructor(
        private route: ActivatedRoute,
        private articlesService: ArticleService,
        private commentsService: CommentsService,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: { article: Article }) => {
                this.article = data.article;
                console.log(this.article);
                this.populateComments();
            }
        );

        this.userService.currentUser.subscribe(
            (userData: User) => {
                this.currentUser = userData;
                this.canModify = (this.currentUser.username === this.article.author.username);
            }
        );
    }

    onToggleFavorite(favorited: boolean) {
        this.article.favorited = favorited;

        if(favorited) {
            this.article.favoritesCount++;
            console.log("favorite")
        } else {
            this.article.favoritesCount--;
            console.log("unfavorite")
        }
    }

    onToggleFollowing(following: boolean) {
        this.article.author.following = following;
    }
    deleteArticle() {
        this.isDeleting = true;
    
        this.articlesService.destroy(this.article.slug)
          .subscribe(
            success => {
              this.router.navigateByUrl('/');
            }
          );
      }
    
      populateComments() {
        this.commentsService.getAll(this.article.slug)
          .subscribe(comments => this.comments = comments);
      }
    
      addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};
    
        const commentBody = this.commentControl.value;
        this.commentsService
          .add(this.article.slug, commentBody)
          .subscribe(
            comment => {
              this.comments.unshift(comment);
              this.commentControl.reset('');
              this.isSubmitting = false;
            },
            errors => {
              this.isSubmitting = false;
              this.commentFormErrors = errors;
            }
          );
      }
    
      onDeleteComment(comment) {
        this.commentsService.destroy(comment.id, this.article.slug)
          .subscribe(
            success => {
              this.comments = this.comments.filter((item) => item !== comment);
            }
          );
      }
    

}