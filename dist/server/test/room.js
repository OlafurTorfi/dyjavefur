"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var room_1 = require("../components/room");
var chai_1 = require("chai");
describe("Room tests", function () {
    it("should fetch Room from postgres", function () {
        return room_1.getRooms().then(function (res) {
            chai_1.expect(res.length).to.be.greaterThan(0);
            res.forEach(function (room) {
                chai_1.expect(room.volume).to.be.greaterThan(0);
                chai_1.expect(room.area).to.be.greaterThan(0);
                chai_1.expect(room.level.length).to.be.greaterThan(0);
            });
        });
    });
});
//# sourceMappingURL=room.js.map