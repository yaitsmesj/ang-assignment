import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { ArticleRoutingModule } from "./article-routing.module";
import { ArticleComponent } from "./article.component";
import { ArticleCommentComponent } from "./article-comment.component";
import { ArticleResolver } from "./article-resolver.service";

@NgModule({
    imports: [
        SharedModule,
        ArticleRoutingModule
    ],
    declarations: [
        ArticleComponent,
        ArticleCommentComponent
    ],
    providers: [
        ArticleResolver
    ]
})
export class ArticleModule {}
