import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-company-overview',
    templateUrl: './company-overview.component.html',
    styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit, OnDestroy {

    companies = [];
    usersObject = {};
    subscription: any;

    constructor(private httpServer: HttpService,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.getData();
            });
    }

    async ngOnInit() {
        this.getData();
    }

    async getData() {
        try {
            this.companies = await this.httpServer.getData('/company');

            const usersPromise = this.companies.reduce((total, company) => {
                total.push(this.httpServer.getData(`/user/count/${company._id}`));
                return total;
            }, []);

            const usersResponse = await Promise.all(usersPromise);

            usersResponse.forEach((user: any) => {
                this.usersObject[user._id] = user.amount;
            });
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
