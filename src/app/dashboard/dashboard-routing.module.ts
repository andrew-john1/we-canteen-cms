import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../guards/auth.guard';

import {CompanyOverviewComponent} from './company/company-overview/company-overview.component';
import {CompanyDetailComponent} from './company/company-detail/company-detail.component';
import {UserOverviewComponent} from './user/user-overview/user-overview.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {FoodEntrepreneurOverviewComponent} from './food-entrepreneur/food-entrepreneur-overview/food-entrepreneur-overview.component';
import {FoodEntrepreneurDetailComponent} from './food-entrepreneur/food-entrepreneur-detail/food-entrepreneur-detail.component';
import {MealOverviewComponent} from './meal/meal-overview/meal-overview.component';
import {MealDetailComponent} from './meal/meal-detail/meal-detail.component';
import {LocationOverviewComponent} from './location/location-overview/location-overview.component';
import {LocationDetailComponent} from './location/location-detail/location-detail.component';
import {CalendarOverviewComponent} from './calendar/calendar-overview/calendar-overview.component';
import {CalendarDetailComponent} from './calendar/calendar-detail/calendar-detail.component';
import {InstanceOverviewComponent} from './instance/instance-overview/instance-overview.component';
import {InstanceDetailComponent} from './instance/instance-detail/instance-detail.component';
import {DashboardComponent} from './dashboard.component';
import {OrderOverviewComponent} from './order/order-overview/order-overview.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {AccountComponent} from './account/index/account.component';
import {AdminOverviewComponent} from './admin/admin-overview/admin-overview.component';
import {AdminDetailComponent} from './admin/admin-detail/admin-detail.component';
import {PasswordResetComponent} from './account/password-reset/password-reset.component';
import {AboutComponent} from './about/about.component';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {path: 'account', component: AccountComponent},
                    {path: 'account/password-reset', component: PasswordResetComponent},
                    {path: 'about', component: AboutComponent},
                    {path: 'instances', component: InstanceOverviewComponent},
                    {path: 'instances/:id', component: InstanceDetailComponent},
                    {path: 'companies', component: CompanyOverviewComponent},
                    {path: 'companies/:id', component: CompanyDetailComponent},
                    {path: 'locations', component: LocationOverviewComponent},
                    {path: 'locations/:id', component: LocationDetailComponent},
                    {path: 'admins', component: AdminOverviewComponent},
                    {path: 'admins/:id', component: AdminDetailComponent},
                    {path: 'users', component: UserOverviewComponent},
                    {path: 'users/:id', component: UserDetailComponent},
                    {path: 'orders', component: OrderOverviewComponent},
                    {path: 'orders/:id', component: OrderDetailComponent},
                    {path: 'food-entrepreneurs', component: FoodEntrepreneurOverviewComponent},
                    {path: 'food-entrepreneurs/:id', component: FoodEntrepreneurDetailComponent},
                    {path: 'meals', component: MealOverviewComponent},
                    {path: 'meals/:id', component: MealDetailComponent},
                    {path: 'calendar', component: CalendarOverviewComponent},
                    {path: 'calendar/:locationId', component: CalendarDetailComponent},
                    {path: '', component: CalendarDetailComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
}
