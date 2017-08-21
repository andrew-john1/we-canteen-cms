import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanyOverviewComponent} from './company/company-overview/company-overview.component';
import {CompanyDetailComponent} from './company/company-detail/company-detail.component';
import {LocationOverviewComponent} from './location/location-overview/location-overview.component';
import {LocationDetailComponent} from './location/location-detail/location-detail.component';
import {CalendarOverviewComponent} from './calendar/calendar-overview/calendar-overview.component';
import {CalendarDetailComponent} from './calendar/calendar-detail/calendar-detail.component';
import {FoodEntrepreneurOverviewComponent} from './food-entrepreneur/food-entrepreneur-overview/food-entrepreneur-overview.component';
import {FoodEntrepreneurDetailComponent} from './food-entrepreneur/food-entrepreneur-detail/food-entrepreneur-detail.component';
import {MealOverviewComponent} from './meal/meal-overview/meal-overview.component';
import {MealDetailComponent} from './meal/meal-detail/meal-detail.component';
import {UserOverviewComponent} from './user/user-overview/user-overview.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {InstanceOverviewComponent} from './instance/instance-overview/instance-overview.component';
import {InstanceDetailComponent} from './instance/instance-detail/instance-detail.component';
import {FormsModule} from '@angular/forms';
import {CalendarComponent} from 'ap-angular2-fullcalendar';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    declarations: [
        AdminComponent,
        InstanceOverviewComponent,
        InstanceDetailComponent,
        CompanyOverviewComponent,
        CompanyDetailComponent,
        LocationOverviewComponent,
        LocationDetailComponent,
        CalendarOverviewComponent,
        CalendarDetailComponent,
        FoodEntrepreneurOverviewComponent,
        FoodEntrepreneurDetailComponent,
        MealOverviewComponent,
        MealDetailComponent,
        UserOverviewComponent,
        UserDetailComponent,
        DashboardComponent,
        CalendarComponent
    ]
})
export class AdminModule {
}
