import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {Subject} from 'rxjs/Subject';
import {EventService} from '../../../services/event.service';

@Component({
    selector: 'app-calendar-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './calendar-detail.component.scss',
        '../../../../../node_modules/angular-calendar/dist/css/angular-calendar.css',
        '../../../../../node_modules/bootstrap/dist/css/bootstrap.css'
    ],
    templateUrl: './calendar-detail.component.html'
})

export class CalendarDetailComponent implements OnInit, OnDestroy {
    view = 'month';
    form: FormGroup;

    viewDate: Date = new Date();
    showDialog: boolean = false;

    sub;
    event: any = {};
    events = [];
    foodEntrepreneurs: any = [];
    meals: any = [];

    mealsByFoodEntrepreneur = {};
    mealsObject = {};
    foodEntrepreneursObject = {};
    locationId;
    activeMonth;

    subscription: any;

    refresh: Subject<any> = new Subject();

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private router: Router,
                private httpService: HttpService) {
        this.subscription = this.eventService.getEventChangeEmitter()
            .subscribe(() => {
                this.router.navigate(['/dashboard/calendar']);
            });

        this.sub = this.route.params.subscribe(params => {
            this.locationId = params['locationId'];
        });
    }

    async ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('selectFoodEntrepreneur', new FormControl(''));
        this.form.addControl('selectMeal', new FormControl(''));

        this.activeMonth = moment(this.viewDate).get('month');

        try {
            const [
                foodEntrepreneurs,
                meals
            ] = await Promise.all([
                this.httpService.getData('/foodEntrepreneur'),
                this.httpService.getData('/meal')
            ]);

            console.log(foodEntrepreneurs);
            console.log(meals);

            foodEntrepreneurs.map(foodEntrepreneur => {
                this.foodEntrepreneursObject[foodEntrepreneur._id] = foodEntrepreneur;

                foodEntrepreneur.value = foodEntrepreneur._id;
                foodEntrepreneur.label = foodEntrepreneur.name;

                return foodEntrepreneur;
            });

            this.foodEntrepreneurs = foodEntrepreneurs;

            meals.forEach(meal => {
                meal.value = meal._id;
                meal.label = meal.name;

                this.mealsObject[meal._id] = meal;

                if (!this.mealsByFoodEntrepreneur[meal.foodEntrepreneurId]) {
                    this.mealsByFoodEntrepreneur[meal.foodEntrepreneurId] = [];
                }

                this.mealsByFoodEntrepreneur[meal.foodEntrepreneurId].push(meal);
            });

            this.getData(moment());
        } catch (err) {
            console.log(err);
        }
    }

    async getData(start) {
        const data = {
            start: moment(start).startOf('month').format(),
            end: moment(start).endOf('month').format(),
            locationId: this.locationId
        };

        const events = await this.httpService.postData('/calendarEvent/dates', {data});
        console.log(events);

        this.events = events.map(event => {
            console.log(event);

            let foodEntrepreneur = this.foodEntrepreneursObject[event.foodEntrepreneurId];

            event.title = foodEntrepreneur.name;
            event.start = moment(event.start);
            event.draggable = true;
            event.color = {
                primary: foodEntrepreneur.color.primary,
                secondary: foodEntrepreneur.color.secondary
            };
            return event;
        });

        this.refresh.next();
    }

    viewDateChange(date) {
        const month = moment(date).get('month');

        if (this.activeMonth !== month) {
            this.activeMonth = month;
            this.getData(date);
        }
    }

    async eventTimesChanged({event, newStart}) {
        event.start = newStart;

        try {
            await this.httpService.patchData('/calendarEvent', {event});
        } catch (err) {
            console.log(err);
        }

        this.refresh.next();
    }

    selectFoodEntrepreneur(foodEntrepreneur) {
        this.meals = this.mealsByFoodEntrepreneur[foodEntrepreneur._id];
        this.event.title = foodEntrepreneur.name;
    }

    deselectFoodEntrepreneur(foodEntrepreneur) {
        this.event.mealIds = [];
    }

    eventClicked({event}) {
        if (this.showDialog) {
            return;
        }

        this.showDialog = true;
        this.event = event;

        this.meals = this.mealsByFoodEntrepreneur[event.foodEntrepreneurId];
    }

    dayClicked({day: {date}}) {
        if (this.showDialog) {
            return;
        }

        this.showDialog = true;
        this.event.start = moment(date).hour(17).format();
    }

    async save(event) {
        if (!event.foodEntrepreneurId || !event.mealIds) {
            return;
        }

        try {
            if (event._id) {
                await this.httpService.patchData('/calendarEvent', {event});
            } else {
                event.locationId = this.locationId;
                await this.httpService.postData('/calendarEvent', {event});

                const color = this.foodEntrepreneursObject[event.foodEntrepreneurId].color;

                event.draggable = true;
                event.start = moment(event.start);
                event.color = {
                    primary: color.primary,
                    secondary: color.secondary
                };

                this.events.push(event);
            }

            this.close();
            this.refresh.next();
        } catch (err) {
            console.log(err);
        }
    }

    async delete(id) {
        try {
            await this.httpService.deleteData(`/calendarEvent/${id}`);

            this.events.forEach((event, index) => {
                if (event._id === id) {
                    this.events.splice(index, 1);
                }
            });

            this.close();
            this.refresh.next();
        } catch (err) {
            console.log(err);
        }
    }

    close() {
        this.showDialog = false;
        this.event = {};
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }
}
