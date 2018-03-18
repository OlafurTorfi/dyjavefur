"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("../postgres");
var floor_1 = require("../../shared/model/floor");
var db = postgres_1.createFinder("select \"Area\", \"FamilyName\", \"TypeName\", l.\"Name\" as \"Level\" from \"Floors\" as w\njoin \"FloorTypes\" as wt on w.\"TypeId\"=wt.\"Id\"\njoin \"Levels\" as l on l.\"Id\"=w.\"Level\"", []);
exports.getFloors = floor_1.createGetFloors(db).query;
//# sourceMappingURL=floor.js.map