import * as assert from 'assert'
import { materials, Material, AreaType, MaterialAmount } from '../data/materials'
import { DB } from '../db'
import { RoomAllocation, roomAllocations } from '../data/room'


export interface RoomDataType {
    area: number,
    level: string,
    elevation: number,
    volume: number,
    number: number,
    name: string
}
export const parseRoom = (roomData: any): RoomDataType => {
    return {
        area: Number(roomData.Area),
        number: Number(roomData.Number),
        volume: Number(roomData.Volume),
        elevation: Number(roomData.Elevation),
        name: roomData.Name,
        level: roomData.Level
    }
}

export interface Room extends AreaType {
    area: number
    level: string,
    volume: number,
    elevation: number,
    number: number,
    name: string
}

export const createGetRooms: (db: DB) => { query: () => Promise<Room[]> } = (db: DB) => {
    return {
        query: async (): Promise<Room[]> => {
            const res = await db.query()

            const rooms = res.rows.map(parseRoom).map((room) => {
                const alloc = roomAllocations.find(roomAlloc => {
                    return roomAlloc.number === room.number
                })
                assert(alloc, 'unable to find allocation for room number: ' + room.number + ' room.Level: ' + room.level + ' room.name: ' + room.name)
                let res: Room = {
                    area: room.area,
                    level: room.level,
                    volume: room.volume,
                    elevation: room.elevation,
                    number: room.number,
                    name: room.name,
                    type: '',
                    price: 0,
                    family: ''
                }
                if (alloc) {
                    assert(alloc.name === room.name, 'alloc.name must match room.name. Alloc: ' + JSON.stringify(alloc) + ' room.name: ' + room.name)
                    res.type = alloc.type
                }
                return res
            })
            return rooms
        }
    }
}