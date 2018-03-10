"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = require("../postgres");
var door_1 = require(" ../../../shared/model/door");
// import { DB } from '../../shared/db'
var db = postgres_1.createFinder("select \"FamilyName\", \"TypeName\", \"Width\", \"Height\" from \"Doors\" as \"d\"\njoin \"DoorTypes\" as \"dt\" on d.\"TypeId\"=dt.\"Id\"", []);
exports.getDoors = door_1.createGetDoors(db).query;
//# sourceMappingURL=door.js.map