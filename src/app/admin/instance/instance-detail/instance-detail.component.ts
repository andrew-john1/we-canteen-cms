import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-instance-detail',
    templateUrl: './instance-detail.component.html',
    styleUrls: ['./instance-detail.component.scss']
})
export class InstanceDetailComponent implements OnInit {
    @ViewChild('input') input;

    id;
    instance = {};
    editField = false;
    iconColor = '#6f8692';

    constructor(private httpService: HttpService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id === 'new') {
            this.editField = !this.editField;
            this.iconColor = 'darkgreen';

            setTimeout(() => {
                this.input.nativeElement.focus();
            }, 100);
        } else {
            this.instance = await this.httpService.getData(`/instances/${this.id}`);
        }
    }

    edit() {
        this.editField = !this.editField;

        if (this.editField) {
            this.iconColor = 'darkgreen';

            setTimeout(() => {
                this.input.nativeElement.focus();
            }, 100);
        } else {
            this.iconColor = '#6f8692';
        }
    }

    async save(instance) {
        try {
            let response;

            if (this.id === 'new') {
                response = await this.httpService.postData(`/instances`, instance);
            } else {
                response = await this.httpService.patchData(`/instances`, instance);
            }

            this.router.navigate(['/admin/instances']);

        } catch (err) {
            console.log(err);
        }

    }

}
