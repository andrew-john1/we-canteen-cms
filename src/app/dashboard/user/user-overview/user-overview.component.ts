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

    constructor(private httpServer: HttpService,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.httpServer.getData('/users')
                    .then(users => {
                        this.users = users;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }

    async ngOnInit() {
        try {
            this.users = await this.httpServer.getData('/users');
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
