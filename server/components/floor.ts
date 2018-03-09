import * as assert from 'assert'
import { query } from '../db'
import { materials, Material, AreaType, MaterialAmount } from './materials'

export interface Floor extends AreaType { }

const floorPrices: { type: string, materials: MaterialAmount[] }[] = [
    {
        type: 'Generic 150mm',
        materials: [
            { type: 'Steypa', amount: 0.15 },
        ]
    },
    {
        type: 'Einangrun 100mm',
        materials: [
            { type: 'Einangrun', amount: 1 },
        ]
    },
    {
        type: 'Gólfefni 100mm',
        materials: [
            { type: 'Gólfefni innanhúss-meðaltal', amount: 1 },
        ]
    }
]
export const getFloors = async (): Promise<Floor[]> => {
    const res = await query(`select "Area", "FamilyName", "TypeName", "Level" from "Floors" as w
    join "FloorTypes" as wt on w."TypeId"=wt."Id"`)

    const floors = res.rows.map(floor => {
        const floorType = floorPrices.find(floorp => { return floorp.type === floor.TypeName })
        assert(floorType, 'no price found for ' + floor.TypeName)
        const calc = floorType && floorType.materials.reduce((prev, curr) => {
            const materialprice = materials.find(materialp => materialp.type === curr.type)
            assert(materialprice, 'no price found for ' + curr.type)
            return prev + curr.amount * (materialprice ? materialprice.price : 0)

        }, 0)
        const price: number = (calc ? calc : 0) * floor.Area
        return {
            price,
            area: floor.Area,
            family: floor.FamilyName,
            type: floor.TypeName,
            materials: floorType ? floorType.materials : []
        }
    })
    return floors
}
