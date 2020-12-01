import { Building } from "../buildings/Building";
import { Biome } from "./Biome";
import { randomBlock } from "./Block";
import { Field } from "./Field";
import { randomResource } from "./Resource";

const rand = (low: number, high: number) => low + Math.floor(Math.random() * (high - low))
const rand100 = () => Math.floor(Math.random() * 100)

export class GameMap {

    private map = new Array<Array<Field>>();
    private biome: Biome;
    private size: number;

    constructor(biome: Biome, size: number, oceansCount: number, oceanSpan: number) {
        this.biome = biome;
        this.size = size;

        // Generate random map
        for (let x = 0; x < size; ++x) {
            this.map[x] = new Array<Field>();
            for (let y = 0; y < size; ++y) {
                this.map[x][y] = {
                    block: randomBlock(),
                    resource: randomResource(),
                    building: undefined,
                };
            }
        }

        // Generate oceans
        while (oceansCount--) {
            const x = rand(1, size - 1);
            const y = rand(1, size - 1);
            this.putOcean(x, y, oceanSpan);
        }

    }

    public putOcean(x: number, y: number, span: number): void {
        if (x < 1 || y < 1 || x > this.size - 1 || y > this.size - 1) return;
        this.map[x][y].block = 'OCEAN';
        if (rand100() < 50) this.map[x - 1][y].block = 'OCEAN';
        if (rand100() < 50) this.map[x + 1][y].block = 'OCEAN';
        if (rand100() < 50) {
            this.map[x][y - 1].block = 'OCEAN';
            if (rand100() < 50) this.map[x - 1][y - 1].block = 'OCEAN';
            if (rand100() < 50) this.map[x - 1][y + 1].block = 'OCEAN';
        }
        if (rand100() < 50) {
            this.map[x][y + 1].block = 'OCEAN';
            if (rand100() < 50) this.map[x + 1][y - 1].block = 'OCEAN';
            if (rand100() < 50) this.map[x + 1][y + 1].block = 'OCEAN';
        }
        if (span) this.putOcean(x + rand(-1, 1), y + rand(-1, 1), span - 1);
    }

    public build(x: number, y: number, building: Building): void {
        if (this.map[x][y].block === 'NONE' && this.map[x][y].building === undefined)
            this.map[x][y].building = building;
    }

    public render(): string {
        const tileSize = 3;
        const display: string[] = [];
        for (let x = 0; x < this.size; ++x) {
            for (let y = 0; y < this.size; ++y) {
                let ch: string = " ";
                switch (this.map[x][y].block) {
                    case 'NONE': ch = "."; break;
                    case 'MOUNTAINS': ch = "^"; break;
                    case 'LAKE': ch = "o"; break;
                    case 'OCEAN': ch = "~"; break;
                }
                for (let i = 0; i < tileSize; ++i) {
                    const offset = y * tileSize + i;
                    if (!display[offset]) display[offset] = "";
                    display[offset] += ch + ch
                        + (i === 1 ? (this.map[x][y].building === undefined ? " " : this.map[x][y].building?.name.substr(0, 1)) : ch)
                        + ch + ch + "  ";
                }
                if (x === this.size - 1) display[y * tileSize + tileSize - 1] += "\n";
            }
        }
        return display.join("\n");
    }

}
