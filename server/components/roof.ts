import { createFinder } from '../postgres'
import { createGetRoofs, Roof } from ' ../../../shared/model/roof'
const db = createFinder(`select "Area", "FamilyName", "TypeName", "Level" from "Roofs" as w
join "RoofTypes" as wt on w."TypeId"=wt."Id"`, [])
export const getRoofs: () => Promise<Roof[]> = createGetRoofs(db).query