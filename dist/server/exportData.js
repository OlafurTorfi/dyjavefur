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
var wall_1 = require("./components/wall");
var door_1 = require("./components/door");
var floor_1 = require("./components/floor");
var roof_1 = require("./components/roof");
var room_1 = require("./components/room");
var fs_1 = require("fs");
exports.exportModel = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var exportData, wd, dd, fd, rfd, rmd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exportData = function (name, func) { return __awaiter(_this, void 0, void 0, function () {
                    var d;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, func()];
                            case 1:
                                d = _a.sent();
                                return [2 /*return*/, 'export const ' + name + ' = ' + JSON.stringify(d) + ';\n'];
                        }
                    });
                }); };
                return [4 /*yield*/, exportData('walls', wall_1.getWalls)];
            case 1:
                wd = _a.sent();
                return [4 /*yield*/, exportData('doors', door_1.getDoors)];
            case 2:
                dd = _a.sent();
                return [4 /*yield*/, exportData('floors', floor_1.getFloors)];
            case 3:
                fd = _a.sent();
                return [4 /*yield*/, exportData('roofs', roof_1.getRoofs)];
            case 4:
                rfd = _a.sent();
                return [4 /*yield*/, exportData('rooms', room_1.getRooms)];
            case 5:
                rmd = _a.sent();
                fs_1.writeFileSync(__dirname + '/../../shared/data/export/walls.js', wd);
                fs_1.writeFileSync(__dirname + '/../../shared/data/export/doors.js', dd);
                fs_1.writeFileSync(__dirname + '/../../shared/data/export/floors.js', fd);
                fs_1.writeFileSync(__dirname + '/../../shared/data/export/roofs.js', rfd);
                fs_1.writeFileSync(__dirname + '/../../shared/data/export/rooms.js', rmd);
                return [2 /*return*/];
        }
    });
}); };
exports.exportModel();
//# sourceMappingURL=exportData.js.map