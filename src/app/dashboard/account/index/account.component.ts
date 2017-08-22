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
    foodEntrepreneurs = [];
    userId = localStorage.getItem('userId');

    constructor(private httpService: HttpService,
                private router: Router) {
    }

    async ngOnInit() {
        try {
            this.user = await this.httpService.getData(`/admins/${this.userId}`);

            if (this.user.userRights > 1) {
                this.foodEntrepreneurs = await this.httpService.getData('/foodEntrepreneurs');
                this.foodEntrepreneurs.unshift({_id: '', name: 'Not a Food Entrepreneur'});
            }

            if (this.user.foodEntrepreneurId) {
                this.foodEntrepreneur = await this.httpService.getData(`/foodEntrepreneurs/${this.user.foodEntrepreneurId}`);
            } else {
                this.user.foodEntrepreneurId = '';
            }
        } catch (err) {
            console.log(err);
        }
    }

    resetPassword() {
        this.router.navigate(['/dashboard/account/password-reset']);
    }

    async save(user) {
        console.log(user);
        try {
            await this.httpService.patchData('/users', {user});
            console.log('user saved');
        } catch (err) {
            console.log(err);
        }
    }

}
