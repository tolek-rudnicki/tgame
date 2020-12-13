export interface Event {
    kind: string
}

export class AbstractEvent<E extends Event> implements Event {
    kind!: string
    sender!: Observable<E>
    update(observers: Observer<E>[]): void {
        observers.forEach((observer: Observer<E>) => observer.handle(this))
    }
}

export interface Observer<E extends Event> {
    handle(event: AbstractEvent<E>): void
}

export interface Observable<E extends Event> {
    register(observer: Observer<E>): void
    unregister(observer: Observer<E>): void
}
