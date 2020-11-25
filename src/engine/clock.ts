interface Observer {
    handle(observable: Observable): void;
}

interface Observable {
    register(observer: Observer): Observable;
}

class Clock implements Observable {

    private tickDuration: number = 10;
    private time: number = 0;
    private job: number | undefined;

    private onTickObservers: Array<Observer> = [];

    public constructor(tickDuration: number) {
        this.tickDuration = tickDuration;
    }

    public start(): boolean {
        if (this.job !== undefined) return false;
        this.job = setInterval(() => this.tick, this.tickDuration);
        return true;
    }

    public stop(): boolean {
        if (this.job === undefined) return false;
        clearInterval(this.job);
        this.job = undefined;
        return true;
    }

    public getTime(): number {
        return this.time;
    }

    private tick(): void {
        console.log("tick");
        if (this.job === undefined) return;
        this.onTickObservers.forEach(observer => observer.handle(this));
        ++this.time;
    }

    public register(observer: Observer): Clock {
        this.onTickObservers.push(observer);
        return this;
    }

}

class ClockPrint implements Observer {
    public handle(clock: Clock): void {
        console.log("Current time: " + clock.getTime());
    }
}

class ClockStop implements Observer {
    public handle(clock: Clock): void {
        if (clock.getTime() === 5) clock.stop();
    }
}


const c = new Clock(100);
const p = new ClockPrint();
const s = new ClockStop();

c.register(p);
c.register(s);

console.log("Starting clock...");
c.start();
for (;;);
