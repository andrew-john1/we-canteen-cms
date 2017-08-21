import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-location-overview',
    templateUrl: './location-overview.component.html',
    styleUrls: ['./location-overview.component.scss']
})
export class LocationOverviewComponent implements OnInit, OnDestroy {

    locations = [];
    subscription: any;

    constructor(private httpServer: HttpService,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.httpServer.getData('/locations')
                    .then(locations => {
                        this.locations = locations;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }

    async ngOnInit() {
        try {
            this.locations = await this.httpServer.getData('/locations');
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
