import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpModule} from '@angular/http';
import {HttpService} from './services/http.service';
import {AdminModule} from './admin/admin.module';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AdminModule,
        AppRoutingModule
    ],
    providers: [
        HttpService,
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
