"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("../postgres");
var wall_1 = require("../../shared/model/wall");
var db = postgres_1.createFinder("select \"Area\", \"Length\", \"FamilyName\", \"TypeName\", \"Width\" from \"Walls\" as w\njoin \"WallTypes\" as wt on w.\"TypeId\"=wt.\"Id\"", []);
exports.getWalls = wall_1.createGetWalls(db).query;
//# sourceMappingURL=wall.js.map