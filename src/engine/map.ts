// Buildings
type Building = 'NONE' | 'FARM'

// Map
type Field = {
    kind: 'PLAINS' | 'DESERT' | 'ICE' | 'CLAY' | 'MOUNTAINS' | 'BEACH' | 'OCEAN' | 'VOLCANO'
    building: Building;
}

// Map size
const mapSize = 5;
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
build(map, 2, 2, 'FARM')
console.log(map)

// Here is ment to be a random number generator beetween 1 and 8.
// And give the output (for now)

// Structures that you can't build on have a 1/8 chanse of spawning
// Ocean 1/15 1 or 2 oceans per map