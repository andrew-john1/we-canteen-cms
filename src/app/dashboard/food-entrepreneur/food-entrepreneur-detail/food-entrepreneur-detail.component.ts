import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-food-entrepreneur-detail',
    templateUrl: './food-entrepreneur-detail.component.html',
    styleUrls: ['./food-entrepreneur-detail.component.scss']
})
export class FoodEntrepreneurDetailComponent implements OnInit {

    id;
    foodEntrepreneur: any = {};

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id !== 'new') {
            try {
                this.foodEntrepreneur = await this.httpService.getData(`/foodEntrepreneurs/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(foodEntrepreneur) {
        try {
            if (this.id === 'new') {
                await this.httpService.postData('/foodEntrepreneurs', {foodEntrepreneur});
            } else {
                await this.httpService.patchData('/foodEntrepreneurs', {foodEntrepreneur});
            }

            this.router.navigate(['/dashboard/food-entrepreneurs']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/foodEntrepreneurs/${this.id}`);
            this.router.navigate(['/dashboard/food-entrepreneurs']);
        } catch (err) {
            console.log(err);
        }
    }

}
