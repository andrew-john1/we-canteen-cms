import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-calendar-overview',
    templateUrl: './calendar-overview.component.html',
    styleUrls: ['./calendar-overview.component.scss']
})
export class CalendarOverviewComponent implements OnInit, OnDestroy {

    locations = [];
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
            this.locations = await this.httpServer.getData('/location');
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
