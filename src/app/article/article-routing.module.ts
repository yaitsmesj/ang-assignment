import { ArticleComponent } from "./article.component";
import { ArticleResolver } from "./article-resolver.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: ':slug',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolver
        }
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
