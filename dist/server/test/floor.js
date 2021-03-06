"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var floor_1 = require("../components/floor");
var chai_1 = require("chai");
describe("Floor tests", function () {
    it("should fetch floors from postgres", function () {
        return floor_1.getFloors().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (floor) {
                chai_1.expect(floor.area).to.be.greaterThan(0);
                chai_1.expect(floor.level.length).to.be.greaterThan(0);
                chai_1.expect(floor.type.length).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=floor.js.map