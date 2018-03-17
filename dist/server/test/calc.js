"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_1 = require("../../shared/model/calc");
var chai_1 = require("chai");
var wall_1 = require("../components/wall");
var door_1 = require("../components/door");
var floor_1 = require("../components/floor");
var roof_1 = require("../components/roof");
var room_1 = require("../components/room");
exports.getPrice = calc_1.createGetPrice(door_1.getDoors, floor_1.getFloors, roof_1.getRoofs, wall_1.getWalls).getPrice;
describe('calculate test', function () {
    it('should be able to calculate total price', function () {
        return exports.getPrice().then(function (cost) {
            console.log('total cost of the house so far is ', cost);
            chai_1.expect(cost).to.be.greaterThan(0);
        });
    });
    it('should get walls, group by type and print average', function () {
        return wall_1.getWalls().then(function (walls) {
            var grouped = calc_1.groupByType(walls);
            grouped.forEach(function (wall) {
                var average = wall.price / wall.area;
                chai_1.expect(average).to.be.greaterThan(2000);
                console.log('The house has ', wall.area, ' of ', wall.type, '. Total price: ', wall.price, '. Average price: ', average);
            });
        });
    });
    describe('should do materials grouping', function () {
        var example = [{
                price: 1,
                area: 2,
                family: 'Basic Roof',
                type: 'Generic - 400mm',
                materials: []
            },
            {
                price: 10,
                area: 20,
                family: 'Basic Roof',
                type: 'Generic - 400mm',
                materials: []
            },
            {
                price: 100,
                area: 200,
                family: 'Basic Roof',
                type: 'Other Roof',
                materials: []
            }];
        it('should be able to group by type', function () {
            var grouped = calc_1.groupByType(example);
            chai_1.expect(grouped).to.deep.eq([
                { price: 11, area: 22, family: 'Basic Roof', type: 'Generic - 400mm', materials: [] },
                { price: 100, area: 200, family: 'Basic Roof', type: 'Other Roof', materials: [] }
            ]);
        });
        it('should be able to group all', function () {
            var grouped = calc_1.groupAll(example);
            chai_1.expect(grouped).to.deep.eq({ price: 111, area: 222 });
        });
    });
    describe('schedule data', function () {
        it('should get matshlutar', function () {
            return Promise.all([room_1.getRooms(), wall_1.getWalls(), roof_1.getRoofs()]).then(function (_a) {
                var rooms = _a[0], walls = _a[1], roofs = _a[2];
                var matshlutar = calc_1.calculateMatshlutar(rooms, walls, roofs);
                console.log('Debug matshlutar: ', matshlutar);
            });
        });
    });
});
//# sourceMappingURL=calc.js.map