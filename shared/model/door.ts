import { doorSuggestion, doorChoice, DoorSuggestion, DoorChoice } from '../data/door'
import { QueryResult, Query } from 'pg'
import * as assert from 'assert'
import { DB } from '../db'
import { BaseType } from '../data/materials'
export interface Door extends BaseType {
    choice: DoorSuggestion,
    width: number,
    height: number
}

export const createGetDoors: (db: DB) => { query: () => Promise<Door[]> } = (db: DB) => {
    return {
        query: async () => {
            const res: QueryResult = await db.query()
            const doors = res.rows.map(d => {
                const doorPrice = doorChoice.find(dp => { return dp.type === d.TypeName })
                assert(doorPrice, 'no price found for ' + d.TypeName)
                return Object.assign({
                    price: doorPrice ? doorPrice.price : 0
                }, d)
            })
            return doors
        }
    }
}