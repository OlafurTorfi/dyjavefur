"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var door_1 = require("../components/door");
var chai_1 = require("chai");
describe("Door tests", function () {
    it("should fetch doors from postgres", function () {
        return door_1.getDoors().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (door) {
                chai_1.expect(door.price).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=door.js.map