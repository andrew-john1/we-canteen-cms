import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-admin-overview',
    templateUrl: './admin-overview.component.html',
    styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit {

    admins = [];
    foodEntrepreneursObject = {};

    constructor(private httpServer: HttpService) {
    }

    async ngOnInit() {
        try {
            const [
                admins,
                foodEntrepreneurs
            ] = await Promise.all([
                this.httpServer.getData('/admins'),
                this.httpServer.getData('/foodEntrepreneurs')
            ]);

            this.admins = admins;

            foodEntrepreneurs.forEach(foodEntrepreneur => {
                this.foodEntrepreneursObject[foodEntrepreneur._id] = foodEntrepreneur;
            });

        } catch (err) {
            console.log(err);
        }
    }
}
