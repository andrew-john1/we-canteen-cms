import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {Config} from '../../app.config';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    id;
    image;
    user: any = {};
    url = Config.public;
    imageSelect = false;
    foodEntrepreneur: any = {};
    userId = localStorage.getItem('userId');

    constructor(private httpService: HttpService,
                private router: Router) {
    }

    async ngOnInit() {
        try {
            this.user = await this.httpService.getData(`/admin/${this.userId}`);
            this.id = this.user.foodEntrepreneurId;
            this.foodEntrepreneur = await this.httpService.getData(`/foodEntrepreneur/${this.user.foodEntrepreneurId}`);

            if (this.foodEntrepreneur.image) {
                this.foodEntrepreneur.imageUrl = this.url + this.foodEntrepreneur.image.medium;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async onChange(event) {
        this.image = event.target.files[0];
        this.imageSelect = true;
    }

    async save(foodEntrepreneur) {
        try {

            await this.httpService.patchData('/foodEntrepreneur', {foodEntrepreneur});

            if (this.image) {
                const id = foodEntrepreneur._id;
                const formData = new FormData();

                formData.append('id', id);
                formData.append('file', this.image);

                await this.httpService.postData(`/foodEntrepreneur/image`, formData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async delete() {
        try {
            await this.httpService.deleteData(`/foodEntrepreneur/${this.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteImage() {
        try {
            await this.httpService.deleteData(`/foodEntrepreneur/image/${this.id}`);
            delete this.foodEntrepreneur.image;
        } catch (err) {
            console.log(err);
        }
    }

}
