import { Farm } from "./buildings/Farm"
import { Warehouse } from "./buildings/Warehouse";
import { GameMap } from "./map/GameMap"


// Starting the game (console)
export const map = new GameMap('PLAINS', 10, 0, 5);
const farm = new Farm();
const warehouse = new Warehouse();
warehouse.setProduct('FOOD');
map.build(3, 3, farm);
map.build(5, 4, warehouse);
map.build(1, 1, warehouse);
farm.connectTo(warehouse);

// Map Render
const mapElement = document.getElementById("map")
mapElement!.innerHTML = map.render()

let i = 10;
while (i--) map.tick();
