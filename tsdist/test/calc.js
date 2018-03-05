"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_1 = require("../components/calc");
var chai_1 = require("chai");
describe('calculate test', function () {
    it('should be able to calculate total price', function () {
        return calc_1.getPrice().then(function (cost) {
            console.log('total cost of the house so far is ', cost);
            chai_1.expect(cost).to.be.greaterThan(0);
        });
    });
});
//# sourceMappingURL=calc.js.map