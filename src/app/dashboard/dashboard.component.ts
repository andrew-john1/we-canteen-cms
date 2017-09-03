import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HttpService} from '../services/http.service';
import {EventService} from '../services/event.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: any = {};
    instance = {};
    instances = [];
    showMenu = false;
    activeRoute = {};
    navigationObject: any = {};

    navigation = [
        {
            name: 'Account',
            url: '/dashboard/account',
            icon: 'account_circle',
            userRights: 1
        },
        {
            name: 'Instances',
            url: '/dashboard/instances',
            icon: 'business',
            userRights: 3
        },
        {
            name: 'Companies',
            url: '/dashboard/companies',
            icon: 'store',
            userRights: 3
        },
        {
            name: 'Locations',
            url: '/dashboard/locations',
            icon: 'room',
            userRights: 2
        },
        {
            name: 'Admins',
            url: '/dashboard/admins',
            icon: 'people_outline',
            userRights: 3
        },
        {
            name: 'Users',
            url: '/dashboard/users',
            icon: 'people',
            userRights: 2
        },
        {
            name: 'Calendar',
            url: '/dashboard/calendar',
            icon: 'insert_invitation',
            userRights: 2
        },
        {
            name: 'Food Entrepreneurs',
            url: '/dashboard/food-entrepreneurs',
            icon: 'restaurant_menu',
            userRights: 2
        },
        {
            name: 'Orders',
            url: '/dashboard/orders',
            icon: 'assignment',
            userRights: 1
        },
        {
            name: 'Meals',
            url: '/dashboard/meals',
            icon: 'room_service',
            userRights: 1
        }
    ];

    constructor(public authService: AuthService,
                private httpService: HttpService,
                private eventService: EventService,
                private router: Router) {
    }

    async ngOnInit() {
        this.navigation.forEach((item: any) => {
            this.navigationObject[item.url] = item;

            if (this.router.url.indexOf(item.url) !== -1) {
                this.activeRoute = item;
            }
        });

        try {
            this.user = await this.httpService.getData('/admin/token');

            if (this.user.foodEntrepreneurId) {
                const item = {
                    name: 'About',
                    url: '/dashboard/about',
                    icon: 'description',
                    userRights: 1
                };
                this.navigation.splice(1, 0, item);
                this.navigationObject[item.url] = item;
            }

            if (this.user.userRights > 2) {
                this.instances = await this.httpService.getData('/instance');

                this.instances.forEach(instance => {
                    if (instance._id === this.user.instanceId) {
                        this.instance = instance;
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    navigate(url) {
        this.activeRoute = this.navigationObject[url];
        this.router.navigate([url]);
    }

    async selectInstance(instance) {
        this.instance = instance;
        this.showMenu = !this.showMenu;
        try {
            const response = await this.httpService.getData(`/admin/instance/${instance._id}`);
            localStorage.setItem('token', response.token);
        } catch (err) {
            console.log(err);
        }
        this.eventService.emitEventChange(instance);
    }

    logout() {
        this.authService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('userRights');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }

}
