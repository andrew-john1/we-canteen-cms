import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';
import {Config} from '../../../app.config';

@Component({
    selector: 'app-food-entrepreneur-detail',
    templateUrl: './food-entrepreneur-detail.component.html',
    styleUrls: ['./food-entrepreneur-detail.component.scss']
})
export class FoodEntrepreneurDetailComponent implements OnInit {

    id;
    image;
    foodEntrepreneur: any = {};
    imageSelect = false;
    url = Config.public;

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
                this.foodEntrepreneur = await this.httpService.getData(`/foodEntrepreneurs/${this.id}`);
                this.foodEntrepreneur.imageUrl = this.url + this.foodEntrepreneur.image.medium;
            } catch (err) {
                console.log(err);
            }
        }
    }

    async onChange(event) {
        this.image = event.target.files[0];
        this.imageSelect = true;
    }

    async save(foodEntrepreneur) {
        try {
            let response;

            if (this.id === 'new') {
                response = await this.httpService.postData('/foodEntrepreneurs', {foodEntrepreneur});
                console.log(response);
            } else {
                await this.httpService.patchData('/foodEntrepreneurs', {foodEntrepreneur});
            }

            if (this.image) {
                const id = foodEntrepreneur._id ? foodEntrepreneur._id : response._id;
                const formData = new FormData();

                formData.append('id', id);
                formData.append('file', this.image);

                await this.httpService.postData(`/foodEntrepreneurs/image`, formData);
            }

            this.router.navigate(['/dashboard/food-entrepreneurs']);
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/foodEntrepreneurs/${this.id}`);
            this.router.navigate(['/dashboard/food-entrepreneurs']);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteImage() {
        try {
            await this.httpService.deleteData(`/foodEntrepreneurs/image/${this.id}`);
            delete this.foodEntrepreneur.image;
        } catch (err) {
            console.log(err);
        }
    }

}
