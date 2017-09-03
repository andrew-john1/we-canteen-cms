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
    priceOptions = {
        align: 'left',
        allowNegative: false,
        prefix: '€ '
    };

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
                this.instance = await this.httpService.getData(`/instance/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(instance) {
        if (typeof instance.price !== 'string') {
            instance.price = instance.price.toFixed(2);
        }

        try {
            if (this.id === 'new') {
                await this.httpService.postData('/instance', {instance});
            } else {
                await this.httpService.patchData('/instance', {instance});
            }

            this.router.navigate(['/dashboard/instances']);

        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/instance/${this.id}`);
            this.router.navigate(['/dashboard/instances']);
        } catch (err) {
            console.log(err);
        }
    }

}
