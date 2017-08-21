import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '**', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // {enableTracing: true} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
