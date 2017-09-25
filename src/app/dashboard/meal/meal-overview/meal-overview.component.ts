import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-meal-overview',
    templateUrl: './meal-overview.component.html',
    styleUrls: ['./meal-overview.component.scss']
})
export class MealOverviewComponent implements OnInit {

    meals = [];
    instance = {};
    foodEntrepreneursObject = {};

    constructor(private httpService: HttpService) {
    }

    async ngOnInit() {
        try {
            const userRights = JSON.parse(localStorage.getItem('userRights'));

            if (userRights > 1) {
                this.meals = await this.httpService.getData('/meal');
            } else {
                this.meals = await this.httpService.getData('/meal/foodEntrepreneur');
            }

            const ids = [];
            this.meals.forEach(meal => {
                if (ids.indexOf(meal.foodEntrepreneurId) === -1) {
                    ids.push(meal.foodEntrepreneurId);
                }
            });

            const foodEntrepreneurs = await this.httpService.postData('/foodEntrepreneur/ids', {ids});

            foodEntrepreneurs.forEach(foodEntrepreneur => {
                this.foodEntrepreneursObject[foodEntrepreneur._id] = foodEntrepreneur;
            });
        } catch (err) {
            console.log(err);
        }
    }

}
