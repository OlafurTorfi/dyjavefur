import { createFinder } from "../postgres";
import { createGetDoors, Door } from "../../shared/model/door";
// import { DB } from '../../shared/db'
const db = createFinder(
  `select "FamilyName", "Comments", "TypeName", "Width", "Height", l."Name" as "Level" from "Doors" as "d"
join "DoorTypes" as "dt" on d."TypeId"=dt."Id"
join "Levels" as l on l."Id"=d."Level"`,
  []
);
export const getDoors: () => Promise<Door[]> = createGetDoors(db).query;
