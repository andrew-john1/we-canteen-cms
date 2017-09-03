import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    user: any = {};
    foodEntrepreneur = {};
    userId = localStorage.getItem('userId');

    constructor(private httpService: HttpService,
                private router: Router) {
    }

    async ngOnInit() {
        try {
            this.user = await this.httpService.getData(`/admin/${this.userId}`);
        } catch (err) {
            console.log(err);
        }
    }

    resetPassword() {
        this.router.navigate(['/dashboard/account/password-reset']);
    }

    async save(user) {
        try {
            await this.httpService.patchData('/admin', {user});
        } catch (err) {
            console.log(err);
        }
    }

}
