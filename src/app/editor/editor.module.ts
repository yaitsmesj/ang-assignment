import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { EditorRoutingModule } from "./editor-routing.module";
import { EditorComponent } from "./editor.component";
import { EditableArticleResolver } from "./editable-article-resolver.service";

@NgModule({
    imports: [SharedModule, EditorRoutingModule],
    declarations: [EditorComponent],
    providers: [EditableArticleResolver]
  })
  export class EditorModule {}
  