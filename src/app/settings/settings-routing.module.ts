import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { AuthGuard } from "../shared";

const routes: Routes = [
    {
      path: '',
      component: SettingsComponent,
      canActivate: [AuthGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingsRoutingModule {}
  