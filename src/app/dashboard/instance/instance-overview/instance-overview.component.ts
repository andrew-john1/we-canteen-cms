import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-instance-overview',
    templateUrl: './instance-overview.component.html',
    styleUrls: ['./instance-overview.component.scss']
})
export class InstanceOverviewComponent implements OnInit {

    instances = [];
    companiesObject = {};
    locationsObject = {};

    constructor(private httpServer: HttpService) {
    }

    async ngOnInit() {
        try {
            this.instances = await this.httpServer.getData('/instances');

            const companyPromises = this.instances.reduce((total, instance) => {
                total.push(this.httpServer.getData(`/companies/count/${instance._id}`));
                return total;
            }, []);

            const locationPromises = this.instances.reduce((total, instance) => {
                total.push(this.httpServer.getData(`/locations/count/${instance._id}`));
                return total;
            }, []);

            const companiesResponse = await Promise.all(companyPromises);
            const locationsResponse = await Promise.all(locationPromises);

            companiesResponse.forEach((item: any) => {
                this.companiesObject[item._id] = item.amount;
            });

            locationsResponse.forEach((item: any) => {
                this.locationsObject[item._id] = item.amount;
            });

        } catch (err) {
            console.log(err);
        }
    }
}
