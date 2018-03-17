import { createFinder } from '../postgres'
import { createGetRooms, Room } from '../../shared/model/room'
const db = createFinder(`select r."Area", r."Volume", r."Level", r."Number", r."Name" as "Name", l."Name" as "Level",l."Elevation"
from "Rooms" as r
join "Levels" as l on l."Id"=r."Level"`, [])
export const getRooms: () => Promise<Room[]> = createGetRooms(db).query


