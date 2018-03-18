import { getWalls } from './components/wall'
import { getDoors } from './components/door'
import { getFloors } from './components/floor'
import { getRoofs } from './components/roof'
import { getRooms } from './components/room'
import { writeFileSync, write } from 'fs'

export const exportModel = async () => {
    const exportData = async (name: string, func: Function) => {
        const d = await func()
        return 'export const ' + name + ' = ' + JSON.stringify(d) + ';\n'
    }
    const wd = await exportData('walls', getWalls)
    const dd = await exportData('doors', getDoors)
    const fd = await exportData('floors', getFloors)
    const rfd = await exportData('roofs', getRoofs)
    const rmd = await exportData('rooms', getRooms)
    writeFileSync(__dirname + '/../../shared/data/export/walls.js', wd)
    writeFileSync(__dirname + '/../../shared/data/export/doors.js', dd)
    writeFileSync(__dirname + '/../../shared/data/export/floors.js', fd)
    writeFileSync(__dirname + '/../../shared/data/export/roofs.js', rfd)
    writeFileSync(__dirname + '/../../shared/data/export/rooms.js', rmd)
}

exportModel()