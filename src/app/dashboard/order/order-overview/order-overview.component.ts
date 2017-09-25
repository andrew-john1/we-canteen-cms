import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Component({
    selector: 'app-order-overview',
    templateUrl: './order-overview.component.html',
    styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit {

    orders = [];
    mealsObject = {};
    foodEntrepreneursObject = {};
    locationsObject = {};

    constructor(private httpService: HttpService) {
    }

    async ngOnInit() {
        const userRights = JSON.parse(localStorage.getItem('userRights'));

        if (userRights > 1) {
            this.orders = await this.httpService.getData('/order');
        } else {
            this.orders = await this.httpService.getData('/meal/foodEntrepreneur');
        }

        const mealIds = [];
        const foodEntrepreneurIds = [];
        const locationIds = [];

        this.orders.forEach(order => {
            if (mealIds.indexOf(order.mealId) === -1) {
                mealIds.push(order.mealId);
            }

            if (foodEntrepreneurIds.indexOf(order.foodEntrepreneurId) === -1) {
                foodEntrepreneurIds.push(order.foodEntrepreneurId);
            }

            if (locationIds.indexOf(order.locationId) === -1) {
                locationIds.push(order.locationId);
            }
        });

        const [
            meals,
            foodEntrepreneurs,
            locations
        ] = await Promise.all([
            this.httpService.postData('/meal/ids', {ids: mealIds}),
            this.httpService.postData('/foodEntrepreneur/ids', {ids: foodEntrepreneurIds}),
            this.httpService.postData('/location/ids', {ids: locationIds})
        ]);

        meals.forEach(meal => {
            this.mealsObject[meal._id] = meal;
        });

        foodEntrepreneurs.forEach(foodEntrepreneur => {
            this.foodEntrepreneursObject[foodEntrepreneur._id] = foodEntrepreneur;
        });

        locations.forEach(location => {
            this.locationsObject[location._id] = location;
        });
    }

}
