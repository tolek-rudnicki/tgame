// Biome
type Biome = 'PLAINS' | 'ICE' | 'DESERT'

// Landscape blocks
type Block = 'NONE' | 'MOUNTAINS' | 'LAKE' | 'OCEAN'

// Buildings
type Building = 'NONE' | 'FARM'

// Natural resource
type Resource = 'NONE' | 'CRYSTALS' | 'ORE' | 'GAS'

// Map
type Field = {
    block: Block
    resource: Resource
    building: Building
}

// Pick random integer
const rand = (low: number, high: number): number => low + Math.floor(Math.random() * (high - low))
const rand100 = (): number => Math.floor(Math.random() * 100)

// Map size
const mapSize = 10
class GameMap {

    private map = new Array<Array<Field>>()
    private biome: Biome
    private size: number

    constructor (biome: Biome, size: number, oceansCount: number, oceanSpan: number) {
        this.biome = biome
        this.size = size

        // Generate random map
        for (let x = 0; x < size; ++x) {
            this.map[x] = new Array<Field>()
            for (let y = 0; y < size; ++y) {
                this.map[x][y] = {
                    block: randomBlock(),
                    resource: randomResource(),
                    building: 'NONE',
                }
            }
        }

        // Generate oceans
        while (oceansCount--) {
            const x = rand(1, size - 1)
            const y = rand(1, size - 1)
            this.putOcean(x, y, oceanSpan)
        }

    }

    public putOcean(x: number, y: number, span: number): void {
        if (x < 1 || y < 1 || x > this.size - 1|| y > this.size -1) return;
        this.map[x][y].block = 'OCEAN'
        if (rand100() < 50) this.map[x - 1][y].block = 'OCEAN'
        if (rand100() < 50) this.map[x + 1][y].block = 'OCEAN'
        if (rand100() < 50) {
            this.map[x][y - 1].block = 'OCEAN'
            if (rand100() < 50) this.map[x - 1][y - 1].block = 'OCEAN'
            if (rand100() < 50) this.map[x - 1][y + 1].block = 'OCEAN'
        }
        if (rand100() < 50) {
            this.map[x][y + 1].block = 'OCEAN'
            if (rand100() < 50) this.map[x + 1][y - 1].block = 'OCEAN'
            if (rand100() < 50) this.map[x + 1][y + 1].block = 'OCEAN'
        }
        if (span) this.putOcean(x + rand(-1, 1), y + rand(-1, 1), span - 1)
    }

    public build(x: number, y: number, building: Building): void {
        if (this.map[x][y].block === 'NONE' && this.map[x][y].building === 'NONE') this.map[x][y].building = building
    }

    public render(): string {
        const tileSize = 3
        const display: string[] = []
        for (let x = 0; x < this.size; ++x) {
            for (let y = 0; y < this.size; ++y) {
                let ch: string = " "
                switch (this.map[x][y].block) {
                    case 'NONE': ch = "…"; break;
                    case 'MOUNTAINS': ch = "}"; break;
                    case 'LAKE': ch = "o"; break;
                    case 'OCEAN': ch = "~"; break;
                }
                for (let i = 0; i < tileSize; ++i) {
                    const offset = y * tileSize + i
                    if (!display[offset]) display[offset] = "";
                    display[offset] += ch + ch + (i === 1
                        ? this.map[x][y].building.substr(0, 1).replace("N", ch)
                        : ch) + ch + ch + "  ";
                }
                if (x === this.size - 1) display[y * tileSize + tileSize - 1] += "\n";
            }
        }
        return display.join("\n");
    }

}

const randomBlock = (): Block => {
    const chance = rand100()
    if (chance < 3.7) return 'LAKE'
    else if (chance < 2 * 3.7) return 'MOUNTAINS'
    return 'NONE'
}

const randomResource = (): Resource => {
    const chance = rand100()
    if (chance < 12.5) return 'CRYSTALS'
    else if (chance < 2 * 12.5) return 'ORE'
    else if (chance < 3 * 12.5) return 'GAS'
    return 'NONE'
}

// Test building
const map = new GameMap('PLAINS', 10, 2, 5)
map.build(3, 3, 'FARM')

// And give the output (for now)
console.log(map.render())
