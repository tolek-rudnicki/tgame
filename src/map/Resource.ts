// Natural resource

export type Resource = 'NONE' | 'CRYSTALS' | 'ORE' | 'GAS';

export const randomResource = (): Resource => {
    const chance = Math.random() * 100
    if (chance < 12.5) return 'CRYSTALS'
    else if (chance < 2 * 12.5) return 'ORE'
    else if (chance < 3 * 12.5) return 'GAS'
    return 'NONE'
}