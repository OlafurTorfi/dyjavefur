import {
  doorSuggestion,
  doorChoice,
  DoorSuggestion,
  DoorChoice
} from "../data/door";
import { QueryResult, Query } from "pg";
import * as assert from "assert";
import { DB } from "../db";
import { AreaType, LevelType } from "../data/materials";
export interface Door extends LevelType {
  choice: DoorSuggestion;
  width: number;
  height: number;
  comments: string;
}

export const createGetDoors: (db: DB) => { query: () => Promise<Door[]> } = (
  db: DB
) => {
  return {
    query: async () => {
      const res: QueryResult = await db.query();
      const doors = res.rows.map(d => {
        const door = doorChoice.find(dp => {
          return dp.type === d.TypeName;
        });
        assert(door, "no door found for " + d.TypeName);
        return Object.assign(
          {
            price: door ? door.price : 0,
            area: door ? door.area / 1000000 : 0,
            type: d.TypeName,
            level: d.Level,
            comments: d.Comments
          },
          d
        );
      });
      return doors;
    }
  };
};
