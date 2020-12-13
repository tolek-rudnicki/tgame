import { Clock } from "../clock/Clock"
import { Observable, Observer } from "../event"

interface Command {
    command: string
    subject: Unit
    execute(): void
    abort(): void
    private complete(): void
}

class GoToCommand implements Command, Observer {
    command!: 'goto'
    subject: Unit
    x: number
    y: number
    constructor (subject: Unit, x: number, y: number) {
        this.subject = subject
        this.x = x
        this.y = y
    }
    execute(): void {
        Clock.singleton().register(this)
    }
    abort(): void {
        Clock.singleton().unregister(this)
    }

    handle(sender: Observable, event: Event): void {

    }
}