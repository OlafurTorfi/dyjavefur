import { createGetDoors, Door } from './door'
import { createGetWalls, Wall } from './wall'
import { createGetFloors, Floor } from './floor'
import { createGetRoofs, Roof } from './roof'
import { Room } from './room'
import { DB } from '../db'
import { MaterialType, Material, MaterialAmount, AreaType } from '../data/materials'

export const createGetPrice = (doorDB: any, floorDB: any, roofDB: any, wallDB: any) => {
    const getDoors = doorDB as () => Promise<Door[]>// createGetDoors(doorDB).query
    const getFloors = floorDB as () => Promise<Floor[]> // createGetFloors(floorDB).query
    const getRoofs = roofDB as () => Promise<Roof[]> // createGetRoofs(roofDB).query
    const getWalls = wallDB as () => Promise<Wall[]> // createGetWalls(wallDB).query
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

export const groupByType = (items: MaterialType[]) => {
    const distinct: string[] = []

    items.forEach(item => {
        if (distinct.indexOf(item.type) === -1) {
            distinct.push(item.type)
        }
    })

    const result: MaterialType[] = distinct.map(dist => {
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

export const groupAll = (items: MaterialType[]) => {
    return items.reduce((prev, curr) => {
        return { price: prev.price + curr.price, area: prev.area + curr.area }
    }, { price: 0, area: 0 })
}
const sumArea = (rooms: AreaType[]) => {
    return rooms.reduce((prev, curr) => {
        return prev + curr.area
    }, 0)
}
const sumVolume = (rooms: Room[]) => {
    return rooms.reduce((prev, curr) => {
        return prev + curr.volume
    }, 0)
}
const filterType = (rooms: Room[], type: string) => {
    rooms.forEach(r => console.log)
    return rooms.filter(room => room.type === type)
}

export const calculateMatshlutar = (rooms: Room[], walls: Wall[], roofs: Roof[]) => {
    const levels = rooms.reduce((prev, curr) => {
        if (prev.indexOf(curr.level) === -1) {
            return prev.concat(curr.level)
        } else {
            return prev
        }
    }, [] as string[])
    const stigaopFlotur = rooms.filter(r => r.name === 'Stigaop').reduce((prev, curr) => {
        return prev + curr.area
    }, 0)
    return {
        botnplataRummal: sumArea(filterType(rooms.filter(r => r.level === '1. Hæð'), 'A')) * 0.2,
        botnplataFlatarmal: sumArea(filterType(rooms.filter(r => r.level === '1. Hæð'), 'A')),
        utveggir: sumArea(walls.filter(w => w.purpose === 'Útveggur')),
        gluggar: sumArea(walls.filter(w => w.type === 'Gluggi')),
        þakFlotur: sumArea(roofs),
        þakgluggar: 0,
        A: {
            Botnflotur: sumArea(filterType(rooms, 'A')),
            Bruttoflotur: sumArea(filterType(rooms, 'A')) - stigaopFlotur,
            Bruttorummal: 0,
            Nettoflotur: 0,
            BirtFlatarmal: 0,
            Skiptarummal: 0
        },
        B: {
            Botnflotur: sumArea(filterType(rooms, 'B')),
            Bruttoflotur: sumArea(filterType(rooms, 'B')),
            Bruttorummal: sumVolume(filterType(rooms, 'B')),
        },
        C: {
            Botnflotur: sumArea(filterType(rooms, 'C')),
            Bruttoflotur: sumArea(filterType(rooms, 'C')),
        },
        total: {
            Botnflotur: 0,
            Bruttoflotur: 0,
            Bruttorummal: 0,
            Nettoflotur: 0,
            BirtFlatarmal: 0,
            Skiptarummal: 0
        }
    }
}
