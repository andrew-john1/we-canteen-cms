import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

    id;
    subscription: any;
    user: any = {};
    companies = [];

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventService: EventService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.router.navigate(['/dashboard/users']);
            });
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        const promises = [this.httpService.getData(`/companies/`)];

        if (this.id !== 'new') {
            promises.push(this.httpService.getData(`/users/${this.id}`));
        }

        const [
            companies,
            user = {}
        ] = await Promise.all(promises);

        this.companies = companies;
        this.user = user;

        if (this.id === 'new') {
            this.user.companyId = companies[0]._id;
        }
    }

    async save(user) {
        try {
            if (this.id === 'new') {
                await this.httpService.postData('/users', {user});
            } else {
                await this.httpService.patchData('/users', {user});
            }

            this.router.navigate(['/dashboard/users']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/users/${this.id}`);
            this.router.navigate(['/dashboard/users']);
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
