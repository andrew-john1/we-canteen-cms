import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {EventService} from '../services/event.service';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {OrderOverviewComponent} from './order/order-overview/order-overview.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {AccountComponent} from './account/index/account.component';
import {AdminOverviewComponent} from './admin/admin-overview/admin-overview.component';
import {AdminDetailComponent} from './admin/admin-detail/admin-detail.component';
import {PasswordResetComponent} from './account/password-reset/password-reset.component';
import {AboutComponent} from './about/about.component';

import {CalendarModule} from 'angular-calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarUtilsModule} from './calendar/calendar-detail/calendar-utils/module';
import {SelectModule} from 'ng-select';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        CurrencyMaskModule,
        CalendarModule.forRoot(),
        BrowserAnimationsModule,
        CalendarUtilsModule,
        ReactiveFormsModule,
        SelectModule,
        ColorPickerModule
    ],
    declarations: [
        DashboardComponent,
        AccountComponent,
        AboutComponent,
        PasswordResetComponent,
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
        AdminOverviewComponent,
        AdminDetailComponent,
        UserOverviewComponent,
        UserDetailComponent,
        OrderDetailComponent,
        OrderOverviewComponent
    ],
    providers: [
        EventService
    ]
})
export class DashboardModule {
}
