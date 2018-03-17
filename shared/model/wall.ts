import * as assert from 'assert'
import { wallChoices } from '../data/wall'
import { DB } from '../db'
import { materials, MaterialType } from '../data/materials'

export interface Wall extends MaterialType { purpose: string }

export const createGetWalls: (db: DB) => { query: () => Promise<Wall[]> } = (db: DB) => {

    return {
        query: async (): Promise<Wall[]> => {
            const res = await db.query()

            const walls = res.rows.map(wall => {
                const wallType = wallChoices.find(wallp => { return wallp.type === wall.TypeName })
                assert(wallType, 'no price found for ' + wall.TypeName)
                const calc = wallType && wallType.materials.reduce((prev, curr) => {
                    const materialprice = materials.find(materialp => materialp.type === curr.type)
                    assert(materialprice, 'no price found for ' + curr.type)
                    return prev + curr.amount * (materialprice ? materialprice.price : 0)

                }, 0)
                const price = (calc ? calc : 0) * wall.Area
                return Object.assign({
                    price,
                    area: wall.Area,
                    family: wall.FamilyName,
                    type: wall.TypeName,
                    purpose: wallType ? wallType.purpose : '',
                    materials: wallType ? wallType.materials : []
                }, wall)
            })
            return walls
        }
    }
}
