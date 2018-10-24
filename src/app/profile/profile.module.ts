import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileArticlesComponent } from "./profile-articles.component";
import { ProfileComponent } from "./profile.component";
import { ProfileFavoritesComponent } from "./profile-favorites.component";
import { ProfileResolver } from "./profile-resolver.series";

@NgModule({
    imports: [
      SharedModule,
      ProfileRoutingModule
    ],
    declarations: [
      ProfileArticlesComponent,
      ProfileComponent,
      ProfileFavoritesComponent
    ],
    providers: [
      ProfileResolver
    ]
  })
  export class ProfileModule {}
  