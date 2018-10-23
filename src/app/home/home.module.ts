import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared";
import { HomeComponent } from "./home.component";
import { HomeAuthResolver } from "./home-auth-resolver.service";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
   {
        path: '',
        component: HomeComponent,
        resolve: {
            isAuthenticated: HomeAuthResolver
        }
   }
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule
    ],
    declarations: [HomeComponent],
    providers: [HomeAuthResolver]
})
export class HomeModule {

}
