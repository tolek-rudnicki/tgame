// Landscape blocks
type Block = 'PLAINS' | 'DESERT' | 'ICE' | 'CLAY' | 'MOUNTAINS' | 'BEACH' | 'OCEAN' | 'VOLCANO'

// Buildings
type Building = 'NONE' | 'FARM'

// Map
type Field = {
    block: Block
    building: Building
}

// Map size
const mapSize = 5;
type Map = Array<Array<Field>>;

// Generate uniform map
const init = (map: Map, size: number, block: Block): void => {
    for (let x = 0; x < size; ++x) {
        map[x] = new Array<Field>()
        for (let y = 0; y < size; ++y) {
            map[x][y] = {
                block,
                building: 'NONE'
            }
        }
    }
}

// I don't know
const build = (map: Map, x: number, y: number, building: Building): void => {
    map[x][y].building = building
}

const render = (map: Map, size: number): string => {
    const tileSize = 3
    const display: string[] = []
    for (let x = 0; x < size; ++x) {
        for (let y = 0; y < size; ++y) {
            let ch: string = " "
            switch (map[x][y].block) {
                case 'PLAINS': ch = ","; break;
                case 'DESERT': ch = "…"; break;
                case 'ICE': ch = "^"; break;
                case 'CLAY': ch = "#"; break;
            }
            for (let i = 0; i < tileSize; ++i) {
                const offset = y * tileSize + i
                if (!display[offset]) display[offset] = "";
                display[offset] += ch + ch + (i === 1 ? map[x][y].building.substr(0, 1).replace("N", ch) : ch) + ch + ch + "  ";
            }
            if (x === size - 1) display[y * tileSize + tileSize - 1] += "\n";
        }
    }
    return display.join("\n");
}

// Test building
const map: Map = new Array<Array<Field>>()
init(map, mapSize, 'PLAINS')
build(map, 3, 3, 'FARM')
console.log(render(map, mapSize))
