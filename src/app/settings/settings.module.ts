import { NgModule } from "@angular/core";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { SharedModule } from "../shared";

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
  