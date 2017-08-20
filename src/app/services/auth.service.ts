import {Injectable} from '@angular/core';

import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    url = 'http://localhost:3000';

    constructor(private http: Http) {
    }

    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    async login(user): Promise<any> {
        const response = await this.http.post(`${this.url}/api/cms/user/login`, {user})
            .toPromise();

        this.isLoggedIn = true;
        return response.json() || {};
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
