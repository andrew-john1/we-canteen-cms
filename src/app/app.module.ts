import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpModule} from '@angular/http';
import {HttpService} from './services/http.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {FormsModule} from '@angular/forms';
import {DashboardModule} from './dashboard/dashboard.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        DashboardModule,
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
