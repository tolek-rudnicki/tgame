// Buildings
type Building = 'NONE' | 'FARM'

// Areas that you can build in
type Non_Building_Blocks = 'MOUNTAINS' | 'BEACH' | 'OCEAN'

// Map
type Field = {
    kind: 'PLAINS' | 'DESERT' | 'ICE' | 'CLAY';
    building: Building;
}

// Map size
const mapSize = 10;
type Map = Array<Array<Field>>;
const map: Map = new Array<Array<Field>>();

// Generate blocks untill hit the border (Map Size)
for (let x = 0; x < mapSize; ++x) {
    map[x] = new Array<Field>();
    for (let y = 0; y < mapSize; ++y) {
        map[x][y] = {
            kind: 'PLAINS',
            building: 'NONE'
        }
    }
}

// I don't know
const build = (map: Map, x: number, y: number, building: Building): void => {
    map[x][y].building = building
}

// Test building
build(map, 3, 3, 'FARM')
console.log(map)
