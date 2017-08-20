import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-instance-overview',
    templateUrl: './instance-overview.component.html',
    styleUrls: ['./instance-overview.component.scss']
})
export class InstanceOverviewComponent implements OnInit {

    instances = [];

    constructor(private httpServer: HttpService) {
    }

    async ngOnInit() {
        try {
            this.instances = await this.httpServer.getData('/instances');
        } catch (err) {
            console.log(err);
        }
    }

}
