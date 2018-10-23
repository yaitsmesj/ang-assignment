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
import { HttpClientModule } from '@angular/common/http';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    // {
    //   path: 'settings',
    //   loadChildren: './settings/settings.module#SettingsModule'
    // },
    // {
    //   path: 'profile',
    //   loadChildren: './profile/profile.module#ProfileModule'
    // },
    // {
    //   path: 'editor',
    //   loadChildren: './editor/editor.module#EditorModule'
    // },
    {
      path: 'article',
      loadChildren: './article/article.module#ArticleModule'
    }
], {useHash: true});

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
    AuthModule,
    HttpClientModule
  ],
  providers: [
    ApiService,UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
