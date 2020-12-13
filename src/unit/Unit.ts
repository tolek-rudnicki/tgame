import { Clock } from "../clock/Clock"
import { Observable, Observer } from "../event"

abstract class Unit implements Observer {

    private name: string = ""
    private x: number
    private y: number

    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public move(x: number, y: number): void {
        Clock.singleton().register(this)
    }

    public handle(sender: Clock, event: Event): void {

    }

    public toString() {
        return `${this.name} at [${this.x} ${this.y}]`
    }

}