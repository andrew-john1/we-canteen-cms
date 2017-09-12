import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Config} from '../app.config';

@Injectable()
export class HttpService {

    url = Config.url;

    constructor(private http: Http) {
    }

    getData(url): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        return this.http.get(`${this.url}${url}`, {headers})
            .toPromise()
            .then(res => res.json() || {})
            .catch(err => {
                console.log(err);
            });

    }

    postData(url, data): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        return this.http.post(`${this.url}${url}`, data, {headers})
            .toPromise()
            .then(res => res.json() || {})
            .catch(err => {
                console.log(err);
            });
    }

    async patchData(url, data): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        return this.http.patch(`${this.url}${url}`, data, {headers})
            .toPromise()
            .then(res => res.json() || {})
            .catch(err => {
                console.log(err);
            });
    }

    async deleteData(url): Promise<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({'token': token});

        return this.http.delete(`${this.url}${url}`, {headers})
            .toPromise()
            .then(res => res.json() || {})
            .catch(err => {
                console.log(err);
            });
    }
}
