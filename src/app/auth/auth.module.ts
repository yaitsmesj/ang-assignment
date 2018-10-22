import { NgModule, ModuleWithProviders } from "@angular/core";
import { SharedModule } from "../shared";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { NoAuthGuard } from "./no-auth-guard.service";

const authRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'login',
        component: AuthComponent,
        canActivate: [NoAuthGuard]

    },
    {
        path: 'register',
        component: AuthComponent,
        canActivate: [NoAuthGuard]

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
    providers: [NoAuthGuard]
})
export class AuthModule {}
