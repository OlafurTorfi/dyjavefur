import { createFinder } from '../postgres'
import { createGetWalls, Wall } from ' ../../../shared/model/wall'
const db = createFinder(`select "Area", "Length", "FamilyName", "TypeName", "Width" from "Walls" as w
join "WallTypes" as wt on w."TypeId"=wt."Id"`, [])
export const getWalls: () => Promise<Wall[]> = createGetWalls(db).query