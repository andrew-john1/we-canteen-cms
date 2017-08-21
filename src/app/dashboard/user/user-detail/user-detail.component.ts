import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    id;
    user: any = {};

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
                this.user = await this.httpService.getData(`/users/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(user) {
        try {
            let response;

            if (this.id === 'new') {
                response = await this.httpService.postData('/users', {user});
            } else {
                response = await this.httpService.patchData('/users', {user});
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

}
