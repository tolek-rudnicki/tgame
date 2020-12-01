export abstract class Building {

    abstract readonly name: string;
    abstract readonly type: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';
    abstract readonly product: 'FOOD' | 'ORE' | 'GAS' | 'CRYSTALS';
    x: number;
    y: number;
    level = 1;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public work(): void {
        console.log(`Producing ${this.level} items of ${this.product}`);
    }

}
