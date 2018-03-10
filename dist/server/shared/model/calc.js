"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var door_1 = require("./door");
var wall_1 = require("./wall");
var floor_1 = require("./floor");
var roof_1 = require("./roof");
exports.createGetPrice = function (doorDB, floorDB, roofDB, wallDB) {
    var getDoors = door_1.createGetDoors(doorDB).query;
    var getFloors = floor_1.createGetFloors(floorDB).query;
    var getRoofs = roof_1.createGetRoofs(roofDB).query;
    var getWalls = wall_1.createGetWalls(wallDB).query;
    return {
        getPrice: function () { return __awaiter(_this, void 0, void 0, function () {
            var doors, doorPrice, walls, wallPrice, floors, floorPrice, roofs, roofPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getDoors()];
                    case 1:
                        doors = _a.sent();
                        doorPrice = doors.reduce(function (prev, curr) { return prev + curr.price; }, 0);
                        console.log('price of doors ', doorPrice);
                        return [4 /*yield*/, getWalls()];
                    case 2:
                        walls = _a.sent();
                        wallPrice = walls.reduce(function (prev, curr) { return prev + (curr.price ? curr.price : 0); }, 0);
                        console.log('price of walls ', wallPrice);
                        return [4 /*yield*/, getFloors()];
                    case 3:
                        floors = _a.sent();
                        floorPrice = floors.reduce(function (prev, curr) { return prev + (curr.price ? curr.price : 0); }, 0);
                        console.log('price of floors ', floorPrice);
                        return [4 /*yield*/, getRoofs()];
                    case 4:
                        roofs = _a.sent();
                        roofPrice = roofs.reduce(function (prev, curr) { return prev + (curr.price ? curr.price : 0); }, 0);
                        console.log('price of roofs ', roofPrice);
                        return [2 /*return*/, floorPrice + doorPrice + wallPrice + roofPrice];
                }
            });
        }); }
    };
};
exports.groupByType = function (items) {
    var distinct = [];
    items.forEach(function (item) {
        if (distinct.indexOf(item.type) === -1) {
            distinct.push(item.type);
        }
    });
    var result = distinct.map(function (dist) {
        var area = 0;
        var price = 0;
        var materials = [];
        var type = '';
        var family = '';
        items.forEach(function (item) {
            if (item.type === dist) {
                price += item.price;
                area += item.area;
                materials = item.materials;
                type = item.type;
                family = item.family;
            }
        });
        return {
            type: type,
            area: area,
            price: price,
            materials: materials,
            family: family
        };
    });
    return result;
};
exports.groupAll = function (items) {
    return items.reduce(function (prev, curr) {
        return { price: prev.price + curr.price, area: prev.area + curr.area };
    }, { price: 0, area: 0 });
};
//# sourceMappingURL=calc.js.map