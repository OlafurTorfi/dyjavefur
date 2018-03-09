"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_1 = require("../components/calc");
var chai_1 = require("chai");
var wall_1 = require("../components/wall");
describe('calculate test', function () {
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
    it('should be able to calculate total price', function () {
        return calc_1.getPrice().then(function (cost) {
            console.log('total cost of the house so far is ', cost);
            chai_1.expect(cost).to.be.greaterThan(0);
        });
    });
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
});
//# sourceMappingURL=calc.js.map