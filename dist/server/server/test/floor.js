"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var floor_1 = require("../components/floor");
var chai_1 = require("chai");
describe("Door tests", function () {
    it("should fetch floors from postgres", function () {
        return floor_1.getFloors().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (floor) {
                chai_1.expect(floor.price).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=floor.js.map