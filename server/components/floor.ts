import { createFinder } from '../postgres'
import { createGetFloors, Floor } from '../../shared/model/floor'
const db = createFinder(`select "Area", "FamilyName", "TypeName", l."Name" as "Level" from "Floors" as w
join "FloorTypes" as wt on w."TypeId"=wt."Id"
join "Levels" as l on l."Id"=w."Level"`, [])
export const getFloors: () => Promise<Floor[]> = createGetFloors(db).query
