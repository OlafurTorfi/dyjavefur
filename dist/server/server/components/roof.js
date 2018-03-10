"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("../postgres");
var roof_1 = require(" ../../../shared/model/roof");
var db = postgres_1.createFinder("select \"Area\", \"FamilyName\", \"TypeName\", \"Level\" from \"Roofs\" as w\njoin \"RoofTypes\" as wt on w.\"TypeId\"=wt.\"Id\"", []);
exports.getRoofs = roof_1.createGetRoofs(db).query;
//# sourceMappingURL=roof.js.map