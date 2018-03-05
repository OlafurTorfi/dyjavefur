import * as assert from 'assert'
import { query } from '../db'
import { materials } from './materials'

export interface FloorMaterial { type: string, amount: number }
export interface Floor { type: string, materials: Array<FloorMaterial>, price?: number }

const floorPrices: Floor[] = [
    {
        type: 'Generic 150mm',
        materials: [
            { type: 'Steypa', amount: 0.15 },
        ]
    },
    {
        type: 'Einangrun 100mm',
        materials: [
            { type: 'Einangrun', amount: 0.1 },
        ]
    },
    {
        type: 'Gólfefni 100mm',
        materials: [
            { type: 'Gólfefni innanhúss-meðaltal', amount: 0.1 },
        ]
    }
]
export const getFloors = async (): Promise<Floor[]> => {
    const res = await query(`select "Area", "FamilyName", "TypeName", "Level" from "Floors" as w
    join "FloorTypes" as wt on w."TypeId"=wt."Id"`)

    const floors = res.rows.map(floor => {
        const floorPrice = floorPrices.find(floorp => { return floorp.type === floor.TypeName })
        assert(floorPrice, 'no price found for ' + floor.TypeName)
        const calc = floorPrice && floorPrice.materials.reduce((prev, curr) => {
            const materialprice = materials.find(materialp => materialp.type === curr.type)
            assert(materialprice, 'no price found for ' + curr.type)
            return prev + curr.amount * (materialprice ? materialprice.price : 0)

        }, 0)
        return Object.assign({
            price: calc
        }, floor)
    })
    return floors
}
