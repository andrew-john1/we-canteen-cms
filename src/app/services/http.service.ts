import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {appConfig} from '../app.config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

    url = appConfig.url;
    token = localStorage.getItem('token');
    headers = new Headers({'token': this.token});

    constructor(private http: Http) {
    }

    async getData(url): Promise<any> {
        const response = await this.http.get(`${this.url}${url}`, {headers: this.headers})
            .toPromise();

        return response.json() || {};
    }

    async postData(url, data): Promise<any> {
        const response = await this.http.post(`${this.url}${url}`, data, {headers: this.headers})
            .toPromise();

        return response.json() || {};
    }

    async patchData(url, data): Promise<any> {
        const response = await this.http.patch(`${this.url}${url}`, data, {headers: this.headers})
            .toPromise();

        return response.json() || {};
    }

}
