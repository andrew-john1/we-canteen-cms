import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    message: string;
    user = {};

    constructor(private authService: AuthService,
                private router: Router) {
    }

    async login(user) {
        try {
            const response = await this.authService.login(user);

            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
        } catch (err) {
            console.log(err);
        }
    }
}
