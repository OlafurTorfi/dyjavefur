import {
  createGetPrice,
  groupAll,
  groupByType,
  calculateMatshlutar,
  groupByTypeString
} from "../../shared/model/calc";
import { createPool } from "../postgres";
import { sumArea, findByComment } from "../../shared/model/util";
import { expect } from "chai";
import { MaterialType } from "../../shared/data/materials";
import { getWalls } from "../components/wall";
import { getDoors } from "../components/door";
import { getFloors } from "../components/floor";
import { getRoofs } from "../components/roof";
import { getRooms } from "../components/room";
import { writeFileSync, write } from "fs";
import { groupBy } from "lodash";
import { map } from "lodash";

export const getPrice = createGetPrice(getDoors, getFloors, getRoofs, getWalls)
  .getPrice;

describe("calculate test", () => {
  it("should be able to calculate total price", () => {
    return getPrice().then(cost => {
      console.log("total cost of the house so far is ", cost);
      expect(cost).to.be.greaterThan(0);
    });
  });
  it("should get walls, group by type and print average", () => {
    return getWalls().then(walls => {
      const grouped = groupByType(walls);
      grouped.forEach(wall => {
        const average = wall.price / wall.area;
        expect(average).to.be.greaterThan(2000);
        console.log(
          "The house has ",
          wall.area,
          " of ",
          wall.type,
          ". Total price: ",
          wall.price,
          ". Average price: ",
          average,
          ". resistance:",
          wall.resistance,
          ". isolation:",
          wall.isolation
        );
      });
    });
  });
  it("should get roofs, group by type and print average", () => {
    return getRoofs().then(roofs => {
      const grouped = groupByType(roofs);
      grouped.forEach(roof => {
        const average = roof.price / roof.area;
        expect(average).to.be.greaterThan(2000);
        console.log(
          "The house has ",
          roof.area,
          " of ",
          roof.type,
          ". Total price: ",
          roof.price,
          ". Average price: ",
          average,
          ". resistance:",
          roof.resistance,
          ". isolation:",
          roof.isolation
        );
      });

      console.log("roofs : ", grouped);
    });
  });
  describe("should do materials grouping", () => {
    const example: MaterialType[] = [
      {
        price: 1,
        area: 2,
        family: "Basic Roof",
        type: "Generic - 400mm",
        materials: [],
        resistance: 0,
        isolation: 0
      },
      {
        price: 10,
        area: 20,
        family: "Basic Roof",
        type: "Generic - 400mm",
        materials: [],
        resistance: 0,
        isolation: 0
      },
      {
        price: 100,
        area: 200,
        family: "Basic Roof",
        type: "Other Roof",
        materials: [],
        resistance: 0,
        isolation: 0
      }
    ];
    it("should be able to group by type", () => {
      const grouped = groupByType(example);
      expect(grouped).to.deep.eq([
        {
          price: 11,
          area: 22,
          family: "Basic Roof",
          type: "Generic - 400mm",
          materials: [],
          resistance: 0,
          isolation: 0
        },
        {
          price: 100,
          area: 200,
          family: "Basic Roof",
          type: "Other Roof",
          materials: [],
          resistance: 0,
          isolation: 0
        }
      ]);
    });
    it("should be able to group all", () => {
      const grouped = groupAll(example);
      expect(grouped).to.deep.eq({ price: 111, area: 222 });
    });
  });
  describe("postgres data", () => {
    it("should calculate wall area", () => {
      return Promise.all([getWalls(), getDoors()]).then(([walls, doors]) => {
        const groups = groupBy(walls, "comments");
        // const doorGroups = groupBy(doors, "comments");
        // const doorAreas = map(doorGroups, arr => {
        //   return { area: sumArea(arr), comments: arr[0].comments };
        // });
        const areasByGroup = map(groups, arr => {
          return { area: sumArea(arr), comments: arr[0].comments };
        });
        const SteyptirUtveggir =
          // findByComment(doorAreas, "ISteyptumUtvegg").area +
          findByComment(areasByGroup, "SteypturUtveggur").area; // +
        // findByComment(areasByGroup, "ISteyptumUtvegg").area;
        const SteyptirInnveggir =
          // findByComment(doorAreas, "ISteyptumInnvegg").area +
          findByComment(areasByGroup, "SteypturInnveggur").area;
        const StodveggirOgHandridi =
          findByComment(areasByGroup, "Handriði").area +
          findByComment(areasByGroup, "Stoðveggur").area;
        //  const CLTVeggir = findByComment(areasByGroup, "CLTVeggur").area;
        // console.log("Debug doorAreas: ", doorAreas);
        console.log("Debug areasByGroup: ", areasByGroup);
        // console.log("Debug CLTVeggir: ", CLTVeggir);
        console.log("Debug SteyptirUtveggir: ", SteyptirUtveggir);
        console.log("Debug SteyptirInnveggir: ", SteyptirInnveggir);
        console.log("Debug StodveggirOgHandridi: ", StodveggirOgHandridi);
      });
    });
    it("should get matshlutar", () => {
      return Promise.all([
        getRooms(),
        getWalls(),
        getRoofs(),
        getFloors(),
        getDoors()
      ]).then(([rooms, walls, roofs, floors, doors]) => {
        const matshlutar = calculateMatshlutar(
          rooms,
          walls,
          roofs,
          floors,
          doors
        );
        console.log("Debug matshlutar: ", matshlutar);
        writeFileSync(
          __dirname + "/../../../export/matshlutar.json",
          JSON.stringify(matshlutar)
        );
      });
    });
  });
});
