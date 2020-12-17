import { Building, Product } from "./Building";

export class Warehouse extends Building {

    readonly name = 'WAREHOUSE';
    readonly type = 'COMMERCIAL';

    public setProduct(product: Product) {
        this.product = product;
    }

}
