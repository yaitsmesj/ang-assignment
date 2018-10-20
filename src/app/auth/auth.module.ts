import { NgModule, ModuleWithProviders } from "@angular/core";
import { SharedModule } from "../shared";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'register',
        component: AuthComponent
    }
]);

@NgModule({
    imports: [
        authRouting,
        SharedModule
    ],
    declarations: [
        AuthComponent
    ],
    providers: []
})
export class AuthModule {}
