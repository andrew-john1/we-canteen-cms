import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

    id;
    user: any = {};
    foodEntrepreneur = {};
    foodEntrepreneurs = [];
    maxValue = localStorage.getItem('userRights');

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        try {
            if (this.id !== 'new') {
                this.user = await this.httpService.getData(`/admins/${this.id}`);
            }

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

    async save(user) {
        const userRights = parseInt(this.maxValue);

        if (user.userRights > userRights) {
            alert('cannot create user with higher user rights');
            return;
        }

        try {
            if (this.id === 'new') {
                await this.httpService.postData('/admins', {user});
            } else {
                await this.httpService.patchData('/admins', {user});
            }

            this.router.navigate(['/dashboard/admins']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/admins/${this.id}`);
            this.router.navigate(['/dashboard/admins']);
        } catch (err) {
            console.log(err);
        }
    }

}
