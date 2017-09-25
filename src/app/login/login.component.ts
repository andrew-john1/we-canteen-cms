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
            const {
                token,
                userRights,
                userId
            } = response;

            localStorage.setItem('token', token);
            localStorage.setItem('userRights', userRights);
            localStorage.setItem('userId', userId);

            if (userRights === 3) {
                this.router.navigate(['/dashboard/instances']);
            } else if (userRights === 2) {
                this.router.navigate(['/dashboard/users']);
            } else {
                this.router.navigate(['/dashboard/orders']);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
