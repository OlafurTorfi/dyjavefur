import { createGetDoors } from './door'
import { createGetWalls } from './wall'
import { createGetFloors } from './floor'
import { createGetRoofs } from './roof'
import { DB } from '../db'
import { AreaType, Material, MaterialAmount } from '../data/materials'

export const createGetPrice = (doorDB: any, floorDB: any, roofDB: any, wallDB: any) => {
    const getDoors = createGetDoors(doorDB).query
    const getFloors = createGetFloors(floorDB).query
    const getRoofs = createGetRoofs(roofDB).query
    const getWalls = createGetWalls(wallDB).query
    return {
        getPrice: async (): Promise<number> => {
            const doors = await getDoors()
            const doorPrice = doors.reduce((prev, curr) => { return prev + curr.price }, 0)
            console.log('price of doors ', doorPrice)
            const walls = await getWalls()
            const wallPrice = walls.reduce((prev, curr) => { return prev + (curr.price ? curr.price : 0) }, 0)
            console.log('price of walls ', wallPrice)
            const floors = await getFloors()
            const floorPrice = floors.reduce((prev, curr) => { return prev + (curr.price ? curr.price : 0) }, 0)
            console.log('price of floors ', floorPrice)
            const roofs = await getRoofs()
            const roofPrice = roofs.reduce((prev, curr) => { return prev + (curr.price ? curr.price : 0) }, 0)
            console.log('price of roofs ', roofPrice)
            return floorPrice + doorPrice + wallPrice + roofPrice
        }
    }
}

export const groupByType = (items: AreaType[]) => {
    const distinct: string[] = []

    items.forEach(item => {
        if (distinct.indexOf(item.type) === -1) {
            distinct.push(item.type)
        }
    })

    const result: AreaType[] = distinct.map(dist => {
        let area: number = 0
        let price: number = 0
        let materials: MaterialAmount[] = []
        let type: string = ''
        let family: string = ''
        items.forEach(item => {
            if (item.type === dist) {
                price += item.price
                area += item.area
                materials = item.materials
                type = item.type
                family = item.family
            }
        })
        return {
            type,
            area,
            price,
            materials,
            family
        }
    })
    return result
}

export const groupAll = (items: AreaType[]) => {
    return items.reduce((prev, curr) => {
        return { price: prev.price + curr.price, area: prev.area + curr.area }
    }, { price: 0, area: 0 })
}