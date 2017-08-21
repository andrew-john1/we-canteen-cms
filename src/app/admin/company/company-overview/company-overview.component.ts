import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-company-overview',
    templateUrl: './company-overview.component.html',
    styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

    companies = [];

    constructor(private httpServer: HttpService) {
    }

    async ngOnInit() {
        try {
            this.companies = await this.httpServer.getData('/companies');
        } catch (err) {
            console.log(err);
        }
    }

}
