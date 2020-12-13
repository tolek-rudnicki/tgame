// tslint:disable: max-classes-per-file

import { AbstractEvent } from "../event"
import { Clock } from "./Clock"

export class ClockTickEvent extends AbstractEvent<ClockTickEvent> {
    kind!: 'clock-tick'
    sender!: Clock
    time!: number

    constructor (clock: Clock) {
        super()
        this.sender = clock
        this.time = clock.getTime()
    }
}

export class ClockStoppedEvent extends AbstractEvent<ClockStoppedEvent> {
    kind!: 'clock-stopped'
    sender!: Clock
    time!: number

    constructor (clock: Clock) {
        super()
        this.sender = clock
        this.time = clock.getTime()
    }
}