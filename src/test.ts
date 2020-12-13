// tslint:disable: max-classes-per-file

import { Event, Observable, Observer } from "./engine/event";
import { Clock } from "./engine/clock/Clock";
import { ClockTickEvent } from "./engine/clock/ClockTickEvent";

class ClockPrint implements Observer<ClockTickEvent> {
    public handle(event: ClockTickEvent): void {
        console.log("Current time: " + event.time)
    }
}

class ClockStop implements Observer<ClockTickEvent> {
    public handle(event: ClockTickEvent): void {
        console.log("Clock is " + (event.sender.isRunning() ? "running" : "not running"))
        if (event.time === 10 && event.sender.isRunning()) {
            event.sender.stop()
            console.log("Clock stopped")
        }
    }
}

class ClockUnregister implements Observer<ClockTickEvent> {
    private observer: Observer<ClockTickEvent>
    constructor (observer: Observer<ClockTickEvent>) {
        this.observer = observer
    }
    public handle(event: ClockTickEvent): void {
        if (event.time === 5) event.sender.unregister(this.observer)
    }
}

const c = Clock.singleton()
const p1 = new ClockPrint()
const p2 = new ClockPrint()
const s = new ClockStop()
const u = new ClockUnregister(p2)

c.register(p1)
c.register(p2)
c.register(s)
c.register(u);

console.log("Starting clock...");
c.start();
console.log("Clock started...");
