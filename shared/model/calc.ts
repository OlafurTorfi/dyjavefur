import { createGetDoors, Door } from './door'
import { createGetWalls, Wall } from './wall'
import { createGetFloors, Floor } from './floor'
import { createGetRoofs, Roof } from './roof'
import { Room } from './room'
import { DB } from '../db'
import { MaterialType, Material, MaterialAmount, AreaType, LevelType } from '../data/materials'
import { LookupAddress } from 'dns';
import { format } from 'url';
import { currentId } from 'async_hooks';

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
const formatNumber = (num: number) => {
    return Math.floor(num * 10) / 10
}
const sumVolume = (rooms: Room[]) => {
    return formatNumber(rooms.reduce((prev, curr) => {
        return prev + curr.volume
    }, 0))
}
const filterType = (rooms: Room[], type: string) => {
    rooms.forEach(r => console.log)
    return rooms.filter(room => room.type === type)
}
const findRoomByName = (rooms: Room[], name: string) => {
    const room = rooms.find(r => {
        return r.name === name
    })
    if (!room) {
        throw Error('Room ' + name + ' not found')
    }
    return room
}
const getH3Volume = (bath: Room) => {
    const le = 9.3
    const be = 8
    const lw = 7.8
    const bw = 7.85
    const h1w = 51.4 - 49.5
    const h2 = 54.1 - 49.5
    const h1e = 51 - 49.5
    const h3Plate = le * be + lw * bw + bath.area
    console.log('Debug h3Plate: ', h3Plate);
    return le * be * (h1e + h2) / 2 + lw * bw * (h1w + h2) + bath.volume
}

export interface Eining {
    botnflotur: number,
    milliflotur?: number,
    nettoflotur?: number,
    stigar?: number,
    op?: number,
    u18?: number,
    shMin?: number,
    shMax?: number,
    bruttoVolume: number,
}


export const calculateMatshlutar = (rooms: Room[], walls: Wall[], roofs: Roof[], floors: Floor[]) => {
    const levels = rooms.reduce((prev, curr) => {
        if (prev.indexOf(curr.level) === -1) {
            return prev.concat(curr.level)
        } else {
            return prev
        }
    }, [] as string[])
    const stigaFlotur = rooms.filter(r => r.name === 'Stigi').reduce((prev, curr) => {
        return prev + curr.area
    }, 0)
    const opFlotur = rooms.filter(r => r.name === 'Op').reduce((prev, curr) => {
        return prev + curr.area
    }, 0)

    const aRooms = filterType(rooms, 'A')
    const bRooms = filterType(rooms, 'B')
    const cRooms = filterType(rooms, 'C')

    const aRoomsVolume = sumVolume(aRooms)
    const bRoomsVolume = sumVolume(bRooms)

    const aRoomsArea = sumArea(aRooms)
    const bRoomsArea = sumArea(bRooms)

    const bilskurRooms = rooms.filter(r => r.level === 'Bílskúr')
    const h1Rooms = rooms.filter(r => r.level === '1. Hæð')
    const h2Rooms = rooms.filter(r => r.level === '2. Hæð')
    const h3Rooms = rooms.filter(r => r.level === '3. Hæð')

    const inngangsskjol = findRoomByName(bRooms, 'Inngangsskjól')
    const idurgardur = findRoomByName(bRooms, 'Iðurgarður')
    const svalir = findRoomByName(cRooms, 'Svalir')
    const pallur = findRoomByName(cRooms, 'Pallur')
    const idursvalir = findRoomByName(bRooms, 'Iðursvalir')
    const idurpallur = findRoomByName(bRooms, 'Iðurpallur')
    const solskyli = findRoomByName(cRooms, 'Sólskýli')
    const eldhus = findRoomByName(h2Rooms, 'Eldhús')
    const stofa = findRoomByName(h2Rooms, 'Stofa')
    const bath3h = findRoomByName(h3Rooms, 'Bað')
    const stigi1h = findRoomByName(h1Rooms, 'Stigi')
    const stigi2h = findRoomByName(h2Rooms, 'Stigi')
    const stigi3h = findRoomByName(h3Rooms, 'Stigi')
    const op = findRoomByName(h2Rooms.filter(r => r.level === '2. Hæð'), 'Op')
    const bilskursStigiArea = 750 * 1100 / 1000000
    const burdarvirkiArea = 11.2
    const sudArea = 11.1


    const findFloorByLevelAndType = (floors: Floor[], level: string, type: string) => {
        const tempFloors = floors.filter(f => { return (f.level === level && f.type === type) })
        return tempFloors[0]
    }
    const getMaxHeight = (rooms: Room[]) => {
        return rooms.reduce((prev, curr) => {
            const hm = curr.heightMax
            return Math.max(prev, curr.heightMax)
        }, 0)
    }
    const getMinHeight = (rooms: Room[]) => {
        return rooms.reduce((prev, curr) => {
            console.log('Debug curr.heightMin: ', curr.heightMin);
            const hm = curr.heightMin
            return Math.min(prev, curr.heightMin)
        }, 999)
    }
    const getAverageHeight = (rooms: Room[]) => {
        const totalVolume = rooms.reduce((prev, curr) => {
            return prev + curr.avgHeight * curr.area
        }, 0)
        const totalArea = rooms.reduce((prev, curr) => {
            return prev + curr.area
        }, 0)
        return totalVolume / totalArea
    }

    const bilskurFloor = findFloorByLevelAndType(floors, 'Bílskúr', 'Generic 150mm')
    const h1Floor = findFloorByLevelAndType(floors, '1. Hæð', 'Generic 150mm')
    const h2Floor = findFloorByLevelAndType(floors, '2. Hæð', 'Generic 150mm')
    const h3Floor = findFloorByLevelAndType(floors, '3. Hæð', 'CLT Floor')

    const h2Volume = (h2Floor.area - eldhus.area - stofa.area) * 3 + eldhus.volume + stofa.volume
    const h3Volume = getH3Volume(bath3h)
    const totalVolume = bilskurFloor.area * 3.6 + h1Floor.area * 3 + h2Volume + h3Volume

    const botnfloturM2 = sumArea(floors.filter(f => { return f.type === 'CLT Floor' || f.type === 'Generic 150mm' }))
    const botnplataM2 = bilskurFloor.area + h1Floor.area

    console.log('Debug h3Rooms: ', h3Rooms);
    return {
        botnplataRummal: formatNumber(botnplataM2 * 0.2),
        botnplataFlatarmal: formatNumber(botnplataM2),
        utveggir: sumArea(walls.filter(w => w.purpose === 'Útveggur')),
        gluggar: sumArea(walls.filter(w => w.type === 'Gluggi')),
        þakFlotur: sumArea(roofs),
        þakgluggar: 0,
        A: {
            Botnflotur: formatNumber(botnfloturM2),
            Bruttoflotur: formatNumber(botnfloturM2 - opFlotur),
            Bruttorummal: totalVolume,
            Nettoflotur: sumArea(aRooms),
            BirtFlatarmal: 0,
            Skiptarummal: 0
        },
        B: {
            Botnflotur: sumArea(bRooms),
            Bruttoflotur: sumArea(bRooms),
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
        },
        Einingar: {
            h1: {
                botnflotur: formatNumber(h1Floor.area),
                stigar: formatNumber(stigi1h.area + bilskursStigiArea),
                nettoflotur: formatNumber(sumArea(filterType(h1Rooms, 'A')) - stigi1h.area)
            },
            bilskur: {
                botnflotur: formatNumber(bilskurFloor.area),
                u18: formatNumber(burdarvirkiArea),
                nettoflotur: formatNumber(sumArea(filterType(bilskurRooms, 'A')) - bilskursStigiArea)
            },
            inngangsskjól: {
                botnflotur: formatNumber(inngangsskjol.area)
            },
            idurgardur: {
                botnflotur: formatNumber(idurgardur.area)
            },
            h2: {
                botnflotur: formatNumber(h2Floor.area - svalir.area - idursvalir.area - pallur.area - idurpallur.area),
                stigar: formatNumber(stigi2h.area),
                op: formatNumber(stigi1h.area + op.area),
                shMax: formatNumber(getMaxHeight(h2Rooms)),
                shMin: formatNumber(getMinHeight(h2Rooms)),
                avgHeight: formatNumber(getAverageHeight(h2Rooms)),
                nettoflotur: formatNumber(sumArea(filterType(h2Rooms, 'A')) - stigi2h.area - op.area)
            },
            svalir: {
                botnflotur: formatNumber(svalir.area)
            },
            pallur: {
                botnflotur: formatNumber(pallur.area)
            },
            Idurpallur: {
                botnflotur: formatNumber(idurpallur.area)
            },
            idursvalir: {
                botnflotur: formatNumber(idursvalir.area)
            },
            h3: {
                botnflotur: formatNumber(h3Floor.area - solskyli.area + stigi3h.area),
                op: formatNumber(stigi3h.area),
                u18: formatNumber(sudArea),
                shMax: formatNumber(getMaxHeight(h3Rooms)),
                shMin: formatNumber(getMinHeight(h3Rooms)),
                avgHeight: formatNumber(getAverageHeight(h3Rooms)),
                nettoflotur: formatNumber(sumArea(filterType(h3Rooms, 'A')) - stigi3h.area)
            },
            solskyli: {
                botnflotur: formatNumber(solskyli.area)
            }
        }
    }
}
