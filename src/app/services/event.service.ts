import {EventEmitter} from '@angular/core';

export class EventService {
    eventChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    emitEventChange(instance) {
        this.eventChange.emit(instance);
    }

    getEventChangeEmitter() {
        return this.eventChange;
    }
}
