import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  SharedModule,
  FooterComponent,
  HeaderComponent,
  ApiService,
  UserService
} from './shared';
import { AuthModule } from './auth/auth.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    rootRouting,
    AuthModule
  ],
  providers: [
    ApiService,UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
