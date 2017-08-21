import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {appConfig} from '../app.config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

    url = appConfig.url;

    constructor(private http: Http) {
    }

    async getData(url): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        const response = await this.http.get(`${this.url}${url}`, {headers})
            .toPromise();

        return response.json() || {};
    }

    async postData(url, data): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        const response = await this.http.post(`${this.url}${url}`, data, {headers})
            .toPromise();

        return response.json() || {};
    }

    async patchData(url, data): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        const response = await this.http.patch(`${this.url}${url}`, data, {headers})
            .toPromise();

        return response.json() || {};
    }

    async deleteData(url): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        const response = await this.http.delete(`${this.url}${url}`, {headers})
            .toPromise();

        return response.json() || {};
    }
}
