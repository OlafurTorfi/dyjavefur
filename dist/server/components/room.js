"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("../postgres");
var room_1 = require("../../shared/model/room");
var db = postgres_1.createFinder("select r.\"Area\", r.\"Volume\", r.\"Level\", r.\"Number\", r.\"Name\" as \"Name\", l.\"Name\" as \"Level\",l.\"Elevation\"\nfrom \"Rooms\" as r\njoin \"Levels\" as l on l.\"Id\"=r.\"Level\"", []);
exports.getRooms = room_1.createGetRooms(db).query;
//# sourceMappingURL=room.js.map