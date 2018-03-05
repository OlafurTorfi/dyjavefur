import { query } from '../db'
import * as assert from 'assert'

const doorPrices: { type: string, price: number }[] = [
    {
        type: '2000 x 2100mm',
        price: 400000
    },
    {
        type: '1200 x 2100mm',
        price: 300000
    },
    {
        type: 'Útihurð 950 x 2134mm',
        price: 100000
    },
    {
        type: 'Innihurð 850 x 2134mm',
        price: 50000
    },
    {
        type: 'Útihurð 1000 x 2134mm',
        price: 150000
    },
    {
        type: 'Innihurð 950 x 2134mm',
        price: 50000
    },
    {
        type: '4750 x 2600mm',
        price: 500000
    }
]

export const getDoors = async () => {
    const res = await query(`select "FamilyName", "TypeName", "Width", "Height" from "Doors" as "d"
    join "DoorTypes" as "dt" on d."TypeId"=dt."Id"`)

    const doors = res.rows.map(d => {
        const doorPrice = doorPrices.find(dp => { return dp.type === d.TypeName })
        assert(doorPrice, 'no price found for ' + d.TypeName)
        return Object.assign({
            price: doorPrice ? doorPrice.price : 0
        }, d)
    })
    return doors
}
