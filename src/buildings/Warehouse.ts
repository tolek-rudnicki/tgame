import { Building, Product } from "./Building";

export class Warehouse extends Building {

    readonly name = 'WAREHOUSE';
    readonly type = 'COMMERCIAL';

    public setProduct(product: Product) {
        this.product = product;
    }

    public feed(product: Product, quantity: number): boolean {
        if (this.product !== product) return false;
        console.log(`${this.name} received ${quantity} of ${product}`);
        if (product in this.inputs) this.inputs[product] += quantity;
        else this.inputs[product] = quantity;
        return true; // fixme: add checking for capacity
    }

}
