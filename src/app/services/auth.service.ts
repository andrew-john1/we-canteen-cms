import {Injectable} from '@angular/core';

import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Config} from '../app.config';

@Injectable()
export class AuthService {

    url = Config.url;

    constructor(private http: Http) {
    }

    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    async login(user): Promise<any> {
        console.log(this.url);

        const response = await this.http.post(`${this.url}/admin/login`, {user})
            .toPromise();

        this.isLoggedIn = true;
        return response.json() || {};
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
