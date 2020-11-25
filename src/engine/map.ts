type Building = 'NONE' | 'FARM'
type Field = {
    kind: 'PLAINS' | 'DESERT' | 'MOUNTAINS' | 'WATER' | 'ICE' | 'CLAY';
    building: Building;
}

const mapSize = 5;
type Map = Array<Array<Field>>;
const map: Map = new Array<Array<Field>>();

for (let x = 0; x < mapSize; ++x) {
    map[x] = new Array<Field>();
    for (let y = 0; y < mapSize; ++y) {
        map[x][y] = {
            kind: 'PLAINS',
            building: 'NONE'
        }
    }
}
const build = (map: Map, x: number, y: number, building: Building): void => {
    map[x][y].building = building
}

build(map, 2, 2, 'FARM')
console.log(map)
