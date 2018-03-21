import * as assert from 'assert'
import { wallChoices } from '../data/wall'
import { DB } from '../db'
import { materials, MaterialType, MaterialAmount } from '../data/materials'

export interface Wall extends MaterialType { purpose: string }
export const groupWall = (items: Wall[]) => {
    let area: number = 0
    let price: number = 0
    let materials: MaterialAmount[] = []
    let type: string = ''
    let family: string = ''
    let resistenceArea: number = 0
    let isolationArea: number = 0
    let level: string = ''
    items.forEach(item => {
        price += item.price
        area += item.area
        materials = item.materials
        type = item.type
        family = item.family
        resistenceArea += item.resistance * area
        isolationArea += item.isolation * area
    })
    return {
        type,
        area,
        price,
        materials,
        family,
        resistance: resistenceArea / area,
        isolation: isolationArea / area
    }
}

export const createGetWalls: (db: DB) => { query: () => Promise<Wall[]> } = (db: DB) => {

    return {
        query: async (): Promise<Wall[]> => {
            const res = await db.query()

            const walls = res.rows.map(wall => {
                const wallType = wallChoices.find(wallp => { return wallp.type === wall.TypeName })
                assert(wallType, 'no type found for ' + wall.TypeName)
                if (!wallType) {
                    throw new Error('no type found for ' + wall.TypeName)
                }
                const calc = wallType.materials.reduce((prev, curr) => {
                    const material = materials.find(materialp => materialp.type === curr.type)
                    assert(material, 'no price found for ' + curr.type)
                    if (material) {
                        return {
                            price: prev.price + (curr.amount * material.price),
                            resistance: material.lambda ? prev.resistance + (curr.amount / material.lambda) : prev.resistance
                        }
                    }
                    return prev
                }, { price: 0, resistance: 0 })
                const cost = calc.price * wall.Area
                return Object.assign({
                    price: cost,
                    area: wall.Area,
                    family: wall.FamilyName,
                    type: wall.TypeName,
                    level: wall.Level,
                    purpose: wallType ? wallType.purpose : '',
                    materials: wallType ? wallType.materials : [],
                    resistance: calc.resistance,
                    isolation: calc.resistance !== 0 ? 1 / calc.resistance : 0
                }, wall)
            })
            return walls
        }
    }
}
