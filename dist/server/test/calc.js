"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_1 = require("../../shared/model/calc");
var util_1 = require("../../shared/model/util");
var chai_1 = require("chai");
var wall_1 = require("../components/wall");
var door_1 = require("../components/door");
var floor_1 = require("../components/floor");
var roof_1 = require("../components/roof");
var room_1 = require("../components/room");
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
exports.getPrice = calc_1.createGetPrice(door_1.getDoors, floor_1.getFloors, roof_1.getRoofs, wall_1.getWalls)
    .getPrice;
describe("calculate test", function () {
    it("should be able to calculate total price", function () {
        return exports.getPrice().then(function (cost) {
            console.log("total cost of the house so far is ", cost);
            chai_1.expect(cost).to.be.greaterThan(0);
        });
    });
    it("should get walls, group by type and print average", function () {
        return wall_1.getWalls().then(function (walls) {
            var grouped = calc_1.groupByType(walls);
            grouped.forEach(function (wall) {
                var average = wall.price / wall.area;
                chai_1.expect(average).to.be.greaterThan(2000);
                console.log("The house has ", wall.area, " of ", wall.type, ". Total price: ", wall.price, ". Average price: ", average, ". resistance:", wall.resistance, ". isolation:", wall.isolation);
            });
            console.log("and then with further grouping");
            var groupFull = calc_1.groupByTypeString(grouped, [
                "CLT-15/15",
                "Steypt",
                "Gluggi"
            ]);
            groupFull.forEach(function (wall) {
                var average = wall.price / wall.area;
                chai_1.expect(average).to.be.greaterThan(2000);
                console.log("The house has ", wall.area, " of ", wall.type, ". Total price: ", wall.price, ". Average price: ", average, ". resistance:", wall.resistance, ". isolation:", wall.isolation);
            });
        });
    });
    it("should get roofs, group by type and print average", function () {
        return roof_1.getRoofs().then(function (roofs) {
            var grouped = calc_1.groupByType(roofs);
            grouped.forEach(function (roof) {
                var average = roof.price / roof.area;
                chai_1.expect(average).to.be.greaterThan(2000);
                console.log("The house has ", roof.area, " of ", roof.type, ". Total price: ", roof.price, ". Average price: ", average, ". resistance:", roof.resistance, ". isolation:", roof.isolation);
            });
            console.log("roofs : ", grouped);
        });
    });
    describe("should do materials grouping", function () {
        var example = [
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
        it("should be able to group by type", function () {
            var grouped = calc_1.groupByType(example);
            chai_1.expect(grouped).to.deep.eq([
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
        it("should be able to group all", function () {
            var grouped = calc_1.groupAll(example);
            chai_1.expect(grouped).to.deep.eq({ price: 111, area: 222 });
        });
    });
    describe("postgres data", function () {
        it("should calculate wall area", function () {
            return Promise.all([wall_1.getWalls(), door_1.getDoors()]).then(function (_a) {
                var walls = _a[0], doors = _a[1];
                var groups = lodash_1.groupBy(walls, "comments");
                var doorGroups = lodash_1.groupBy(doors, "comments");
                var doorAreas = lodash_2.map(doorGroups, function (arr) {
                    return { area: util_1.sumArea(arr), comments: arr[0].comments };
                });
                var areasByGroup = lodash_2.map(groups, function (arr) {
                    return { area: util_1.sumArea(arr), comments: arr[0].comments };
                });
                var SteyptirUtveggir = util_1.findByComment(doorAreas, "ISteyptumUtvegg").area +
                    util_1.findByComment(areasByGroup, "SteypturUtveggur").area +
                    util_1.findByComment(areasByGroup, "ISteyptumUtvegg").area;
                var SteyptirInnveggir = util_1.findByComment(doorAreas, "ISteyptumInnvegg").area +
                    util_1.findByComment(areasByGroup, "SteypturInnveggur").area;
                var StodveggirOgHandridi = util_1.findByComment(areasByGroup, "Handriði").area +
                    util_1.findByComment(areasByGroup, "Stoðveggur").area;
                console.log("Debug doorAreas: ", doorAreas);
                console.log("Debug areasByGroup: ", areasByGroup);
                console.log("Debug SteyptirUtveggir: ", SteyptirUtveggir);
                console.log("Debug SteyptirInnveggir: ", SteyptirInnveggir);
                console.log("Debug StodveggirOgHandridi: ", StodveggirOgHandridi);
            });
        });
        it.only("should get matshlutar", function () {
            return Promise.all([
                room_1.getRooms(),
                wall_1.getWalls(),
                roof_1.getRoofs(),
                floor_1.getFloors(),
                door_1.getDoors()
            ]).then(function (_a) {
                var rooms = _a[0], walls = _a[1], roofs = _a[2], floors = _a[3], doors = _a[4];
                var matshlutar = calc_1.calculateMatshlutar(rooms, walls, roofs, floors, doors);
                console.log("Debug matshlutar: ", matshlutar);
                fs_1.writeFileSync(__dirname + "/../../../export/matshlutar.json", JSON.stringify(matshlutar));
            });
        });
    });
});
//# sourceMappingURL=calc.js.map