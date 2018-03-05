import { getDoors } from './door'
import { getWalls } from './wall'
import { getFloors } from './floor'

export const getPrice = async (): Promise<number> => {
    const doors = await getDoors()
    const doorPrice = doors.reduce((prev, curr) => { return prev + curr.price }, 0)
    console.log('price of doors ', doorPrice)
    const walls = await getWalls()
    const wallPrice = walls.reduce((prev, curr) => { return prev + (curr.price ? curr.price : 0) }, 0)
    console.log('price of walls ', wallPrice)
    const floors = await getFloors()
    const floorPrice = floors.reduce((prev, curr) => { return prev + (curr.price ? curr.price : 0) }, 0)
    console.log('price of floors ', floorPrice)
    return floorPrice + doorPrice + wallPrice
}