import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HttpService} from '../services/http.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    message: string;
    user = {};

    constructor(private authService: AuthService,
                private httpService: HttpService,
                private router: Router) {
    }

    login(user) {
        console.log(user);

        this.authService.login(user)
            .then(result => {
                console.log(result);
                localStorage.setItem('token', result.token);
                this.router.navigate(['/admin']);
            })
            .catch(err => {
                console.log(err);
            });

        // this.authService.login().subscribe(() => {
        //
        //     if (this.authService.isLoggedIn) {
        //         // Get the redirect URL from our auth service
        //         // If no redirect has been set, use the default
        //
        //         // Redirect the user
        //         this.router.navigate(['/admin']);
        //     }
        // });
    }
}
