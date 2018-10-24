import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { NgModule } from "@angular/core";
import { ProfileResolver } from "./profile-resolver.series";
import { ProfileArticlesComponent } from "./profile-articles.component";
import { ProfileFavoritesComponent } from "./profile-favorites.component";

const routes: Routes = [
    {
      path: ':username',
      component: ProfileComponent,
      resolve: {
        profile: ProfileResolver
      },
      children: [
        {
          path: '',
          component: ProfileArticlesComponent
        },
        {
          path: 'favorites',
          component: ProfileFavoritesComponent
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule {}
  