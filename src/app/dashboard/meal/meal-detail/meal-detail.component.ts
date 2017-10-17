import {Component, OnInit} from '@angular/core';
import {Config} from '../../../app.config';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {
    id;
    image;
    meal: any = {};
    form: FormGroup;
    foodEntrepreneurs = [];
    imageSelect = false;
    url = Config.public;
    userRights = parseInt(localStorage.getItem('userRights'));
    priceOptions = {
        align: 'left',
        allowNegative: false,
        prefix: '€ '
    };

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    async ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('selectFoodEntrepreneur', new FormControl(''));

        try {
            if (this.userRights > 1) {
                const foodEntrepreneurs = await this.httpService.getData('/foodEntrepreneur');
                this.foodEntrepreneurs = foodEntrepreneurs.map(foodEntrepreneur => {
                    foodEntrepreneur.value = foodEntrepreneur._id;
                    foodEntrepreneur.label = foodEntrepreneur.name;

                    return foodEntrepreneur;
                });
            }

            if (this.id !== 'new') {
                this.meal = await this.httpService.getData(`/meal/${this.id}`);
            }

            if (this.meal.image) {
                this.meal.imageUrl = this.url + this.meal.image.medium;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async onChange(event) {
        this.image = event.target.files[0];
        this.imageSelect = true;
    }

    async save(meal) {
        try {
            if (this.id === 'new') {
                const response = await this.httpService.postData('/meal', {meal});
                meal._id = response._id;
            } else {
                await this.httpService.patchData('/meal', {meal});
            }

            if (this.image) {
                const id = meal._id;
                const formData = new FormData();

                formData.append('id', id);
                formData.append('file', this.image);

                await this.httpService.postData(`/meal/image`, formData);
            }

            this.router.navigate(['/dashboard/meals']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/meal/${this.id}`);
            this.router.navigate(['/dashboard/meals']);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteImage() {
        try {
            await this.httpService.deleteData(`/meal/image/${this.id}`);
            delete this.meal.image;
        } catch (err) {
            console.log(err);
        }
    }

}
