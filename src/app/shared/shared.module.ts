import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
import { ArticleService, ApiService, UserService, ProfileService, AuthGuard } from './services';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { JwtService } from './services/jwt.service';
import { CommentsService } from './services/comments.service';
import { favoriteButtonComponent, FollowButtonComponent } from './buttons';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    favoriteButtonComponent,
    FollowButtonComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor,
    multi: true }, ArticleService, JwtService, ApiService, UserService,CommentsService,ProfileService, AuthGuard
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    favoriteButtonComponent,
    FollowButtonComponent,
    HttpClientModule
  ]
})
export class SharedModule {}
