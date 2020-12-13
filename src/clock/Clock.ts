import { Event, Observable, Observer } from "../event"
import { ClockStoppedEvent, ClockTickEvent } from "./ClockTickEvent"

export class Clock implements Observable<ClockTickEvent | ClockStoppedEvent> {

    private tickDuration: number = 10
    private time: number = 0
    private job: number | undefined

    private observers: Observer<ClockTickEvent | ClockStoppedEvent>[] = []

    private static instance: Clock

    public static singleton(): Clock {
        return this.instance || (this.instance = new Clock())
    }

    public start(): boolean {
        if (this.isRunning()) return false
        this.job = setInterval(Clock.tick, this.tickDuration, this)
        return true
    }

    public stop(): boolean {
        if (!this.isRunning()) return false;
        clearInterval(this.job)
        this.job = undefined

        const event: ClockStoppedEvent = new ClockStoppedEvent(this)
        event.update(this.observers) // todo async

        return true
    }

    public isRunning(): boolean {
        return this.job !== undefined
    }

    public getTime(): number {
        return this.time
    }

    public register(observer: Observer<ClockTickEvent | ClockStoppedEvent>): void {
        this.observers.push(observer)
    }

    public unregister(observer: Observer<ClockTickEvent | ClockStoppedEvent>): void {
        this.observers = this.observers.filter(o => o === observer)
    }

    private static tick(clock: Clock): void {
        if (!clock.isRunning()) return;
        const event: ClockTickEvent = new ClockTickEvent(clock)
        clock.observers.forEach(observer => observer.handle(event)) // todo async
        ++clock.time // todo promise all
    }

}
