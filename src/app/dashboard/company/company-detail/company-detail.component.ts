import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

    id;
    subscription: any;
    company: any = {};

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.router.navigate(['/dashboard/companies']);
            });
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id !== 'new') {
            try {
                this.company = await this.httpService.getData(`/companies/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(company) {
        try {
            if (this.id === 'new') {
                await this.httpService.postData('/companies', {company});
            } else {
                await this.httpService.patchData('/companies', {company});
            }

            this.router.navigate(['/dashboard/companies']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/companies/${this.id}`);
            this.router.navigate(['/dashboard/companies']);
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
