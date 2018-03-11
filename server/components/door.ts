import { createFinder } from '../postgres'
import { createGetDoors, Door } from '../../shared/model/door'
// import { DB } from '../../shared/db'
const db = createFinder(`select "FamilyName", "TypeName", "Width", "Height" from "Doors" as "d"
join "DoorTypes" as "dt" on d."TypeId"=dt."Id"`, [])
export const getDoors: () => Promise<Door[]> = createGetDoors(db).query
