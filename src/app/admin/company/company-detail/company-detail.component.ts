import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

    id;
    company: any = {};
    instances = [];

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        try {
            this.instances = await this.httpService.getData('/instances');
        } catch (err) {
            console.log(err);
        }

        if (this.id === 'new') {
            this.company.instanceId = this.instances[0]._id;
        } else {
            try {
                this.company = await this.httpService.getData(`/companies/${this.id}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async save(company) {
        try {
            let response;

            if (this.id === 'new') {
                response = await this.httpService.postData('/companies', {company});
            } else {
                response = await this.httpService.patchData('/companies', {company});
            }

            this.router.navigate(['/admin/companies']);

        } catch (err) {
            console.log(err);
        }
    }

}
