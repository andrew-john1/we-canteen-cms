import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-instance-detail',
    templateUrl: './instance-detail.component.html',
    styleUrls: ['./instance-detail.component.scss']
})
export class InstanceDetailComponent implements OnInit {

    id;
    instance = {};

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
                this.instance = await this.httpService.getData(`/instances/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(instance) {
        try {
            let response;

            if (this.id === 'new') {
                response = await this.httpService.postData('/instances', {instance});
            } else {
                response = await this.httpService.patchData('/instances', {instance});
            }

            this.router.navigate(['/dashboard/instances']);

        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/instances/${this.id}`);
            this.router.navigate(['/dashboard/instances']);
        } catch (err) {
            console.log(err);
        }
    }

}
