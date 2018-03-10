import { createFinder } from '../postgres'
import { createGetFloors, Floor } from ' ../../../shared/model/floor'
const db = createFinder(`select "Area", "FamilyName", "TypeName", "Level" from "Floors" as w
join "FloorTypes" as wt on w."TypeId"=wt."Id"`, [])
export const getFloors: () => Promise<Floor[]> = createGetFloors(db).query
