
export type Product = 'FOOD' | 'ORE' | 'GAS' | 'CRYSTALS';
export type ProductInputs = { [key in Product]: number };
export type ConsumerOutputs = Building[];

export abstract class Building {

    abstract readonly name: string;
    abstract readonly type: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';
    level: number = 0;

    product: Product | undefined;
    stock: number = 0;

    inputs: ProductInputs = {} as ProductInputs;
    capacity: number = 50;

    outputs: Building[] = [];

    x: number | undefined;
    y: number | undefined;

    public feed(product: Product, quantity: number): number {
        console.log(`${this.name} received ${quantity} of ${product}`);
        if (!(product in this.inputs)) this.inputs[product] = 0;

        if (this.inputs[product] + quantity > this.capacity) {
            const excess = this.inputs[product] + quantity - this.capacity;
            this.inputs[product] = this.capacity;
            return excess;
        }
        this.inputs[product] += quantity;

        return 0;
        
    }

    public connectTo(building: Building): void {
        this.outputs.push(building);
    }

    public placeOnMap(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getOutputPerTick(): number {
        return (1 + this.level / 2) * 10;
    }

    public work(): void {
        if (this.x === undefined || this.y === undefined || this.product === undefined) return;

        const increment = this.getOutputPerTick();
        this.stock += increment;
        if (this.stock > this.capacity) this.stock = this.capacity;

        console.log(`${this.name} is producing ${increment} of ${this.product}, total ${this.stock}`);
        console.log(`Connected ${this.outputs.length} outputs`);

        const n = this.outputs.length;
        if (this.stock == 0 || n == 0) return;

        
        const stockPerOutput = this.stock / n;
        for (let i = 0; i < n; ++i) {
            console.log(`Sending ${stockPerOutput} of ${this.product} to output ${i}`);
            const excess = this.outputs[i].feed(this.product, stockPerOutput)
            this.stock -= stockPerOutput - excess
            console.log(`Excess ${excess}, stock left ${this.stock}`)
        }
    }

}
