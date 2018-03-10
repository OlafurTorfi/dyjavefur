"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roof_1 = require("../components/roof");
var chai_1 = require("chai");
describe("Door tests", function () {
    it("should fetch Roofs from postgres", function () {
        return roof_1.getRoofs().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (roof) {
                chai_1.expect(roof.price).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=roof.js.map