import { Farm } from "./buildings/Farm"
import { GameMap } from "./map/GameMap"

const map = new GameMap('PLAINS', 10, 2, 5)
map.build(3, 3, new Farm(3, 3))

console.log(map.render())
