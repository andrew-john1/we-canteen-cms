import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    user = {};

    constructor(private router: Router,
                private httpService: HttpService) {
    }

    ngOnInit() {
    }

    async save(user) {
        if (!user.oldPassword || !user.newPassword) {
            return;
        }

        await this.httpService.postData('/admin/passwordReset', {user});
        this.router.navigate(['/dashboard/account']);
    }

}
