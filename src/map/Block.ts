export type Block = 'NONE' | 'MOUNTAINS' | 'LAKE' | 'OCEAN';

export const randomBlock = (): Block => {
    const chance = Math.random() * 100
    if (chance < 3.7) return 'LAKE'
    else if (chance < 2 * 3.7) return 'MOUNTAINS'
    return 'NONE'
}
