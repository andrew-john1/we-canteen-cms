import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin.component';
import {AuthGuard} from '../guards/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
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

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {path: 'instances', component: InstanceOverviewComponent},
                    {path: 'instances/:id', component: InstanceDetailComponent},
                    {path: 'companies', component: CompanyOverviewComponent},
                    {path: 'companies/:id', component: CompanyDetailComponent},
                    {path: 'locations', component: LocationOverviewComponent},
                    {path: 'locations/:id', component: LocationDetailComponent},
                    {path: 'users', component: UserOverviewComponent},
                    {path: 'users/:id', component: UserDetailComponent},
                    {path: 'food-entrepreneurs', component: FoodEntrepreneurOverviewComponent},
                    {path: 'food-entrepreneurs/:id', component: FoodEntrepreneurDetailComponent},
                    {path: 'meals', component: MealOverviewComponent},
                    {path: 'meals/:id', component: MealDetailComponent},
                    {path: 'calendar', component: CalendarOverviewComponent},
                    {path: 'calendar/:locationId', component: CalendarDetailComponent},
                    {path: '', component: DashboardComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}
