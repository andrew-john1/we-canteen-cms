import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

    id;
    location: any = {};

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id !== 'new') {
            try {
                this.location = await this.httpService.getData(`/locations/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(location) {
        try {
            if (this.id === 'new') {
                await this.httpService.postData('/locations', {location});
            } else {
                await this.httpService.patchData('/locations', {location});
            }

            this.router.navigate(['/dashboard/locations']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/locations/${this.id}`);
            this.router.navigate(['/dashboard/locations']);
        } catch (err) {
            console.log(err);
        }
    }

}
