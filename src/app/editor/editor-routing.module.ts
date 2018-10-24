import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../shared";
import { EditableArticleResolver } from "./editable-article-resolver.service";
import { NgModule } from "@angular/core";
import { EditorComponent } from "./editor.component";

const routes: Routes = [
    {
      path: '',
      component: EditorComponent,
      canActivate: [AuthGuard]
    },
    {
      path: ':slug',
      component: EditorComponent,
      canActivate: [AuthGuard],
      resolve: {
        article: EditableArticleResolver
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EditorRoutingModule {}
  