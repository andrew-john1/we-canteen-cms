import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-user-overview',
    templateUrl: './user-overview.component.html',
    styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {

    users = [];
    subscription: any;
    companiesObject = {};

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
            const [
                users,
                companies
            ] = await Promise.all([
                this.httpServer.getData('/user'),
                this.httpServer.getData('/company')
            ]);

            this.users = users;

            companies.forEach(company => {
                this.companiesObject[company._id] = company;
            });

        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
