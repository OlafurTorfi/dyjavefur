import * as assert from 'assert'
import { materials, Material, AreaType, MaterialAmount } from '../data/materials'
import { DB } from '../db'
import { floorChoices } from '../data/floor'

export interface Floor extends AreaType { }

export const createGetFloors: (db: DB) => { query: () => Promise<Floor[]> } = (db: DB) => {
    return {
        query: async (): Promise<Floor[]> => {
            const res = await db.query()

            const floors = res.rows.map(floor => {
                const floorType = floorChoices.find(floorp => { return floorp.type === floor.TypeName })
                assert(floorType, 'no price found for ' + floor.TypeName)
                const calc = floorType && floorType.materials.reduce((prev, curr) => {
                    const materialprice = materials.find(materialp => materialp.type === curr.type)
                    assert(materialprice, 'no price found for ' + curr.type)
                    return prev + curr.amount * (materialprice ? materialprice.price : 0)
                }, 0)
                const price: number = (calc ? calc : 0) * floor.Area
                return Object.assign({
                    price,
                    area: floor.Area,
                    family: floor.FamilyName,
                    type: floor.TypeName,
                    materials: floorType ? floorType.materials : []
                }, floor)
            })
            return floors
        }
    }
}
