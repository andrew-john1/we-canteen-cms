import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-food-entrepreneur-overview',
    templateUrl: './food-entrepreneur-overview.component.html',
    styleUrls: ['./food-entrepreneur-overview.component.scss']
})
export class FoodEntrepreneurOverviewComponent implements OnInit {

    foodEntrepreneurs = [];

    constructor(private httpServer: HttpService) {
    }

    async ngOnInit() {
        try {
            this.foodEntrepreneurs = await this.httpServer.getData('/foodEntrepreneurs');
        } catch (err) {
            console.log(err);
        }
    }
}
