import * as assert from 'assert'
import { materials, Material, AreaType, MaterialAmount } from '../data/materials'
import { DB } from '../db'
import { roofChoices } from '../data/roof'

export interface Roof extends AreaType { }

export const createGetRoofs: (db: DB) => { query: () => Promise<Roof[]> } = (db: DB) => {
    return {
        query: async (): Promise<Roof[]> => {
            const res = await db.query()

            const roofs = res.rows.map(roof => {
                const roofType = roofChoices.find(Roofp => { return Roofp.type === roof.TypeName })
                assert(roofType, 'no price found for ' + roof.TypeName)
                const calc = roofType && roofType.materials.reduce((prev, curr) => {
                    const materialType = materials.find(materialp => materialp.type === curr.type)
                    assert(materialType, 'no price found for ' + curr.type)
                    return prev + curr.amount * (materialType ? materialType.price : 0)

                }, 0)
                const price = (calc ? calc : 0) * roof.Area
                return Object.assign({
                    price,
                    area: roof.Area,
                    family: roof.FamilyName,
                    type: roof.TypeName,
                    materials: roofType ? roofType.materials : []
                }, roof)
            })
            return roofs
        }
    }
}
