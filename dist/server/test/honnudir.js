"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var honnudir_1 = require("../adaluppdrattur/honnudir");
var chai_1 = require("chai");
describe('honnudir test', function () {
    it('should fetch honnudir', function () {
        var honnudir = honnudir_1.getHonnudir();
        chai_1.expect(honnudir.length).to.be.greaterThan(0);
    });
});
//# sourceMappingURL=honnudir.js.map