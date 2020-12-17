
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
    lastOutput: number = 0;

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

        let i = 0;
        let totalExcess = 0;
        while (this.stock > 0 && totalExcess < n) {
            --this.stock
            console.log(`Sending 1 ${this.product} to output ${i}`);
            const excess = this.outputs[i].feed(this.product, 1)
            if (excess > 0) {
                console.log(`Got ${excess}`);
                ++this.stock
                ++totalExcess
            }
            ++i
            if (i == n) {
                i = 0;
                totalExcess = 0
            }
        }


        // while (n > 0 && this.stock >= 1 && consumed) {
        //     consumed = false;
        //     const quantity = Math.floor(this.stock / n);
        //     console.log(`Sending ${quantity} of ${this.product} to output ${this.lastOutput}`);
        //     if (this.outputs[this.lastOutput].feed(this.product, quantity)) {
        //         this.stock -= quantity;
        //         consumed = true;
        //     }
        //     this.lastOutput = this.lastOutput >= n ? 0 : this.lastOutput + 1;
        // }
    }

}
