import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

    id;
    form: FormGroup;
    user: any = {};
    foodEntrepreneur = {};
    foodEntrepreneurs = [];
    userRights = parseInt(localStorage.getItem('userRights'));

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        this.form = new FormGroup({});
        this.form.addControl('selectFoodEntrepreneur', new FormControl(''));

        try {
            if (this.id !== 'new') {
                this.user = await this.httpService.getData(`/admin/${this.id}`);
            }

            if (this.userRights > 1) {
                const foodEntrepreneurs = await this.httpService.getData('/foodEntrepreneur');

                this.foodEntrepreneurs = foodEntrepreneurs.map(foodEntrepreneur => {
                    foodEntrepreneur.value = foodEntrepreneur._id;
                    foodEntrepreneur.label = foodEntrepreneur.name;

                    return foodEntrepreneur;
                });

                console.log(this.foodEntrepreneurs);
            }
        } catch (err) {
             console.log(err);
        }
    }

    async save(user) {
        const userRights = this.userRights;

        if (user.userRights > userRights) {
            alert('cannot create user with higher user rights');
            return;
        }

        try {
            if (this.id === 'new') {
                await this.httpService.postData('/admin', {user});
            } else {
                await this.httpService.patchData('/admin', {user});
            }

            if (user._id === localStorage.getItem('userId')) {
                const response = await this.httpService.getData('/admin/generateToken');
                localStorage.setItem('token', response.token);
            }

            this.router.navigate(['/dashboard/admins']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/admin/${this.id}`);
            this.router.navigate(['/dashboard/admins']);
        } catch (err) {
            console.log(err);
        }
    }

}
