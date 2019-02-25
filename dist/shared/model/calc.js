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
var wall_1 = require("./wall");
var util_1 = require("./util");
var customRoom_1 = require("./customRoom");
exports.createGetPrice = function (doorDB, floorDB, roofDB, wallDB) {
    var getDoors = doorDB; // createGetDoors(doorDB).query
    var getFloors = floorDB; // createGetFloors(floorDB).query
    var getRoofs = roofDB; // createGetRoofs(roofDB).query
    var getWalls = wallDB; // createGetWalls(wallDB).query
    return {
        getPrice: function () { return __awaiter(_this, void 0, void 0, function () {
            var doors, doorPrice, walls, wallPrice, floors, floorPrice, roofs, roofPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getDoors()];
                    case 1:
                        doors = _a.sent();
                        doorPrice = doors.reduce(function (prev, curr) {
                            return prev + curr.price;
                        }, 0);
                        console.log("price of doors ", doorPrice);
                        return [4 /*yield*/, getWalls()];
                    case 2:
                        walls = _a.sent();
                        wallPrice = walls.reduce(function (prev, curr) {
                            return prev + (curr.price ? curr.price : 0);
                        }, 0);
                        console.log("price of walls ", wallPrice);
                        return [4 /*yield*/, getFloors()];
                    case 3:
                        floors = _a.sent();
                        floorPrice = floors.reduce(function (prev, curr) {
                            return prev + (curr.price ? curr.price : 0);
                        }, 0);
                        console.log("price of floors ", floorPrice);
                        return [4 /*yield*/, getRoofs()];
                    case 4:
                        roofs = _a.sent();
                        roofPrice = roofs.reduce(function (prev, curr) {
                            return prev + (curr.price ? curr.price : 0);
                        }, 0);
                        console.log("price of roofs ", roofPrice);
                        return [2 /*return*/, floorPrice + doorPrice + wallPrice + roofPrice];
                }
            });
        }); }
    };
};
exports.groupByTypeString = function (items, groups) {
    var result = groups.map(function (group) {
        var area = 0;
        var price = 0;
        var materials = [];
        var type = "";
        var family = "";
        var resistance = 0;
        var isolation = 0;
        items.forEach(function (item) {
            if (item.type.indexOf(group) !== -1) {
                console.log("item in group", group, " found. ", item.area, " big, type was ", item.type);
                price += item.price;
                area += item.area;
                materials = item.materials;
                type = group;
                family = item.family;
                resistance = item.resistance;
                isolation = item.isolation;
            }
        });
        return {
            type: type,
            area: area,
            price: price,
            materials: materials,
            family: family,
            resistance: resistance,
            isolation: isolation
        };
    });
    return result;
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
        var type = "";
        var family = "";
        var resistance = 0;
        var isolation = 0;
        items.forEach(function (item) {
            if (item.type === dist) {
                price += item.price;
                area += item.area;
                materials = item.materials;
                type = item.type;
                family = item.family;
                resistance = item.resistance;
                isolation = item.isolation;
            }
        });
        return {
            type: type,
            area: area,
            price: price,
            materials: materials,
            family: family,
            resistance: resistance,
            isolation: isolation
        };
    });
    return result;
};
exports.groupAll = function (items) {
    return items.reduce(function (prev, curr) {
        return { price: prev.price + curr.price, area: prev.area + curr.area };
    }, { price: 0, area: 0 });
};
var formatNumber = function (num) {
    return Math.floor(num * 10) / 10;
};
var sumVolume = function (rooms) {
    return formatNumber(rooms.reduce(function (prev, curr) {
        return prev + curr.volume;
    }, 0));
};
var filterType = function (rooms, type) {
    rooms.forEach(function (r) { return console.log; });
    return rooms.filter(function (room) { return room.type === type; });
};
var findRoomByName = function (rooms, name) {
    var room = rooms.find(function (r) {
        return r.name === name;
    });
    if (!room) {
        throw Error("Room " + name + " not found");
    }
    return room;
};
var findRoomByNumber = function (rooms, num) {
    var room = rooms.find(function (r) {
        return r.number === num;
    });
    if (!room) {
        throw Error("Room number:" + num + " not found");
    }
    return room;
};
var findDoorByTypeName = function (doors, type) {
    var door = doors.find(function (d) {
        return d.type === type;
    });
    if (!door) {
        throw Error("door " + name + " not found");
    }
    return door;
};
var findFloorByComment = function (floors, comment) {
    var floor = floors.find(function (f) {
        return f.comments === comment;
    });
    if (!floor) {
        throw Error("Floor " + comment + " not found");
    }
    return floor;
};
var findFloorByLevelAndType = function (floors, level, type) {
    var tempFloors = floors.filter(function (f) {
        return f.level === level && f.type === type;
    });
    return tempFloors[0];
};
exports.calculateMatshlutar = function (rooms, walls, roofs, floors, doors) {
    var stigaFlotur = rooms
        .filter(function (r) { return r.name === "Stigi"; })
        .reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var opFlotur = rooms
        .filter(function (r) { return r.name === "Op"; })
        .reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var h1Rooms = rooms.filter(function (r) { return r.level === "1. Hæð"; });
    var h2Rooms = rooms.filter(function (r) { return r.level === "2. Hæð"; });
    var bilskurDoors = doors.filter(function (d) { return d.type === "5000 x 2400mm"; });
    var h1Doors = doors.filter(function (d) { return d.level === "1. Hæð"; });
    var h2Doors = doors.filter(function (d) { return d.level === "2. Hæð"; });
    var maeligolf = floors.filter(function (f) { return f.type === "Mæligólf"; });
    var h1Floor = findFloorByComment(maeligolf, "1HæðMeðVeggjum");
    var h2Floor = findFloorByComment(maeligolf, "2HæðMeðVeggjum");
    var gluggar = walls.filter(function (w) { return w.type === "Gluggi"; });
    var inngangsskjol = findRoomByName(rooms, "Inngangsskjól");
    var inngangsskjolBrutto = findFloorByComment(maeligolf, "Inngangsskjól");
    var idurgardur = findRoomByName(rooms, "Iðurgarður");
    var idurgardurBrutto = findFloorByComment(maeligolf, "Iðurgarður");
    var idursvalirFloor = findFloorByComment(maeligolf, "Iðursvalir");
    var svalir = findRoomByNumber(rooms, 178);
    var svalirFloor = findFloorByComment(maeligolf, "Svalir");
    var pallur = findRoomByNumber(rooms, 123);
    var pallurBrutto = findFloorByComment(maeligolf, "Pallur");
    var idurpallur = findRoomByNumber(rooms, 143);
    var idurpallurBrutto = findFloorByComment(maeligolf, "Iðurpallur");
    var bilskurFloor = findFloorByComment(maeligolf, "Bílskúr");
    var geymsla = findRoomByName(rooms, "Geymsla");
    var stigi1h = findRoomByName(h1Rooms, "Stigi");
    var stigiBilskur = {
        area: 2.05 * 1.2 + 0.6 * 0.3
    };
    var op = findRoomByName(h2Rooms.filter(function (r) { return r.level === "2. Hæð"; }), "Op");
    var bilskur = findRoomByName(h1Rooms, "Bílgeymsla");
    var vinnurymi = findRoomByName(h1Rooms, "Vinnu/Föndur-rými");
    var gryfja = {
        netto: 1 * 4.25,
        brutto: 1.3 * 4.4,
        stigi: 2 * 1
    };
    var svaediEfstu = customRoom_1.calculateUpperFloorVolume();
    var skridkjallariVolume = h1Floor.area * 1.7;
    var h1Volume = (h1Floor.area - bilskurFloor.area) * 3 + bilskurFloor.area * 3.6;
    var h2Volume = svaediEfstu.reduce(function (prev, curr) { return curr.volume + prev; }, 0);
    var externalDoors = util_1.sumArea(doors
        .filter(function (d) { return d.type !== "1200 x 2100mm"; })
        .filter(function (d) { return d.type.indexOf("Innihurð") === -1; }));
    var utveggir = wall_1.groupWall(walls.filter(function (w) { return w.purpose === "Útveggur"; }));
    var þakgluggi = { area: 4.2 + 0.9 };
    var nettofloturH1 = formatNumber(util_1.sumArea(filterType(h1Rooms, "A")) -
        stigi1h.area -
        bilskur.area -
        vinnurymi.area -
        geymsla.area);
    var nettofloturBilskur = formatNumber(bilskur.area + vinnurymi.area + geymsla.area) -
        stigiBilskur.area;
    return {
        botnplataRooms: formatNumber(util_1.sumArea(h1Rooms) - idurgardur.area - inngangsskjol.area),
        botnplataFlatarmal: formatNumber(h1Floor.area),
        // taka út þakskegg og hafa sér
        þakFlotur: util_1.sumArea(roofs),
        þakgluggar: þakgluggi.area,
        // gera með nýju comment aðferðinni
        hjupveggir: utveggir.area + externalDoors,
        doorsAndWindowsArea: externalDoors + util_1.sumArea(gluggar) + þakgluggi.area,
        totalExternalArea: formatNumber(utveggir.area + externalDoors + util_1.sumArea(roofs) + h1Floor.area),
        Einingar: {
            botnplata: formatNumber(h1Floor.area),
            h1: {
                botnflotur: formatNumber(h1Floor.area - bilskurFloor.area),
                stigar: formatNumber(stigi1h.area),
                nettoflotur: nettofloturH1
            },
            bilskur: {
                botnflotur: formatNumber(bilskurFloor.area),
                nettoflotur: nettofloturBilskur,
                stigar: stigiBilskur.area
            },
            h2: {
                botnflotur: formatNumber(h2Floor.area + op.area),
                botnfloturChecksum: formatNumber(svaediEfstu.reduce(function (prev, curr) { return curr.deltaLatitude * curr.deltaLongditude + prev; }, 0)),
                op: formatNumber(op.area),
                shMax: formatNumber(svaediEfstu.reduce(function (prev, curr) { return Math.max(prev, curr.haedMax); }, 0)),
                shMin: formatNumber(svaediEfstu.reduce(function (prev, curr) { return Math.min(prev, curr.haedMax); }, 666)),
                avgHeight: formatNumber(svaediEfstu.reduce(function (prev, curr) { return curr.volume + prev; }, 0) /
                    svaediEfstu.reduce(function (prev, curr) { return curr.deltaLatitude * curr.deltaLongditude + prev; }, 0)),
                volume: formatNumber(svaediEfstu.reduce(function (prev, curr) { return curr.volume + prev; }, 0)),
                nettoflotur: formatNumber(util_1.sumArea(filterType(h2Rooms, "A")) - op.area)
            },
            svalir: {
                nettoflotur: formatNumber(svalir.area),
                brutto: formatNumber(svalirFloor.area + idursvalirFloor.area)
            },
            inngangsskjol: {
                nettoflotur: formatNumber(inngangsskjol.area),
                brutto: formatNumber(inngangsskjolBrutto.area)
            },
            idurgardur: {
                nettoflotur: formatNumber(idurgardur.area),
                brutto: formatNumber(idurgardurBrutto.area)
            },
            pallur: {
                nettoflotur: formatNumber(pallur.area),
                brutto: formatNumber(pallurBrutto.area)
            },
            Idurpallur: {
                nettoflotur: formatNumber(idurpallur.area),
                brutto: formatNumber(idurpallurBrutto.area)
            },
            skridkjallari: {
                netto: formatNumber(nettofloturH1),
                brutto: formatNumber(h1Floor.area - bilskurFloor.area)
            },
            rummal: {
                h1Volume: formatNumber(h1Volume),
                h2Volume: formatNumber(h2Volume),
                skridkjallariVolume: formatNumber(skridkjallariVolume),
                totalVolume: formatNumber(h1Volume + h2Volume + skridkjallariVolume)
            }
        }
    };
};
//# sourceMappingURL=calc.js.map