import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    message: string;

    constructor(public authService: AuthService) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }

}
