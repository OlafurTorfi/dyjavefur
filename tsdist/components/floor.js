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
var assert = require("assert");
var db_1 = require("../db");
var materials_1 = require("./materials");
var floorPrices = [
    {
        type: 'Generic 150mm',
        materials: [
            { type: 'Steypa', amount: 0.15 },
        ]
    },
    {
        type: 'Einangrun 100mm',
        materials: [
            { type: 'Einangrun', amount: 0.1 },
        ]
    },
    {
        type: 'Gólfefni 100mm',
        materials: [
            { type: 'Gólfefni innanhúss-meðaltal', amount: 0.1 },
        ]
    }
];
exports.getFloors = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, floors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.query("select \"Area\", \"FamilyName\", \"TypeName\", \"Level\" from \"Floors\" as w\n    join \"FloorTypes\" as wt on w.\"TypeId\"=wt.\"Id\"")];
            case 1:
                res = _a.sent();
                floors = res.rows.map(function (floor) {
                    var floorPrice = floorPrices.find(function (floorp) { return floorp.type === floor.TypeName; });
                    assert(floorPrice, 'no price found for ' + floor.TypeName);
                    var calc = floorPrice && floorPrice.materials.reduce(function (prev, curr) {
                        var materialprice = materials_1.materials.find(function (materialp) { return materialp.type === curr.type; });
                        assert(materialprice, 'no price found for ' + curr.type);
                        return prev + curr.amount * (materialprice ? materialprice.price : 0);
                    }, 0);
                    return Object.assign({
                        price: calc
                    }, floor);
                });
                return [2 /*return*/, floors];
        }
    });
}); };
//# sourceMappingURL=floor.js.map