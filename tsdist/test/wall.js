"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wall_1 = require("../components/wall");
var chai_1 = require("chai");
describe("Wall tests", function () {
    it("should fetch walls from postgres", function () {
        return wall_1.getWalls().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (wall) {
                chai_1.expect(wall.price).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=wall.js.map