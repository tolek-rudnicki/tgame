import { Farm } from "./buildings/Farm"
import { Warehouse } from "./buildings/Warehouse";
import { GameMap } from "./map/GameMap"

const map = new GameMap('PLAINS', 10, 0, 5);
const farm = new Farm();
const warehouse = new Warehouse();
warehouse.setProduct('FOOD');
map.build(3, 3, farm);
map.build(5, 4, warehouse);
farm.connectTo(warehouse);


console.log(map.render());
console.log(farm);
console.log(warehouse);

let i = 10;
while (i--) map.tick();
