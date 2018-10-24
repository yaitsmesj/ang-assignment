import { NgModule,ModuleWithProviders } from "@angular/core";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { SharedModule } from "../shared";
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services';

@NgModule({
    imports: [
      SharedModule,
      SettingsRoutingModule
    ],
    declarations: [
      SettingsComponent
    ]
  })
  export class SettingsModule {}
  