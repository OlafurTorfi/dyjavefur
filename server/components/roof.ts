import * as assert from 'assert'
import { query } from '../db'
import { materials, Material, AreaType, MaterialAmount } from './materials'

export interface Roof extends AreaType { }

const roofTypes: { type: string, materials: MaterialAmount[] }[] = [
    {
        type: 'Generic - 400mm',
        materials: [
            { type: 'Timbur', amount: 1 },
            { type: 'Tjörupappi', amount: 1 },
            { type: 'Bárujárn', amount: 1 },
            { type: 'Skrúfur', amount: 1 }
        ]
    }
]
export const getRoofs = async (): Promise<Roof[]> => {
    const res = await query(`select "Area", "FamilyName", "TypeName" from "Roofs" as w
    join "RoofTypes" as wt on w."TypeId"=wt."Id"`)

    const roofs = res.rows.map(roof => {
        const roofType = roofTypes.find(Roofp => { return Roofp.type === roof.TypeName })
        assert(roofType, 'no price found for ' + roof.TypeName)
        const calc = roofType && roofType.materials.reduce((prev, curr) => {
            const materialType = materials.find(materialp => materialp.type === curr.type)
            assert(materialType, 'no price found for ' + curr.type)
            return prev + curr.amount * (materialType ? materialType.price : 0)

        }, 0)
        const price = (calc ? calc : 0) * roof.Area
        return {
            price,
            area: roof.Area,
            family: roof.FamilyName,
            type: roof.TypeName,
            materials: roofType ? roofType.materials : []
        }
    })
    return roofs
}