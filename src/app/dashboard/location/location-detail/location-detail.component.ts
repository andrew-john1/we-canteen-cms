import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit, OnDestroy {

    id;
    subscription: any;
    location: any = {};

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.router.navigate(['/dashboard/locations']);
            });
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id !== 'new') {
            try {
                this.location = await this.httpService.getData(`/location/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(location) {
        try {
            if (this.id === 'new') {
                await this.httpService.postData('/location', {location});
            } else {
                await this.httpService.patchData('/location', {location});
            }

            this.router.navigate(['/dashboard/locations']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/location/${this.id}`);
            this.router.navigate(['/dashboard/locations']);
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
