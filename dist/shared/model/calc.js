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
var sumArea = function (rooms) {
    return rooms.reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
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
// const getH3Volume = (bath: Room) => {
//     const le = 9.3
//     const be = 8
//     const lw = 7.8
//     const bw = 7.85
//     const h1w = 51.4 - 49.5
//     const h2 = 54.1 - 49.5
//     const h1e = 51 - 49.5
//     const h3Plate = le * be + lw * bw + bath.area
//     console.log('Debug h3Plate: ', h3Plate);
//     return le * be * (h1e + h2) / 2 + lw * bw * (h1w + h2) + bath.volume
// }
var findFloorByLevelAndType = function (floors, level, type) {
    var tempFloors = floors.filter(function (f) {
        return f.level === level && f.type === type;
    });
    return tempFloors[0];
};
var getMaxHeight = function (rooms) {
    return rooms.reduce(function (prev, curr) {
        var hm = curr.heightMax;
        return Math.max(prev, curr.heightMax);
    }, 0);
};
var getMinHeight = function (rooms) {
    return rooms.reduce(function (prev, curr) {
        var hm = curr.heightMin;
        return Math.min(prev, curr.heightMin);
    }, 999);
};
exports.calculateMatshlutar = function (rooms, walls, roofs, floors, doors) {
    var levels = rooms.reduce(function (prev, curr) {
        if (prev.indexOf(curr.level) === -1) {
            return prev.concat(curr.level);
        }
        else {
            return prev;
        }
    }, []);
    var stigaFlotur = rooms
        .filter(function (r) { return r.name === "Stigi"; })
        .reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var opFlotur = rooms.filter(function (r) { return r.name === "Op"; }).reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var bilskurRooms = rooms.filter(function (r) { return r.level === "Bílskúr"; });
    var h1Rooms = rooms.filter(function (r) { return r.level === "1. Hæð"; });
    var h2Rooms = rooms.filter(function (r) { return r.level === "2. Hæð"; });
    var h3Rooms = rooms.filter(function (r) { return r.level === "Háaloft"; });
    var bilskurDoors = doors.filter(function (d) { return d.type === "5000 x 2400mm"; });
    var h1Doors = doors.filter(function (d) { return d.level === "1. Hæð"; });
    var h2Doors = doors.filter(function (d) { return d.level === "2. Hæð"; });
    var h3Doors = doors.filter(function (d) { return d.level === "Háaloft"; });
    var h3Floor = findFloorByLevelAndType(floors, "Háaloft", "CLT Floor");
    var maeligolf = floors.filter(function (f) { return f.type === "Mæligólf"; });
    var h1Floor = findFloorByComment(maeligolf, "1HæðMeðVeggjum");
    var h2Floor = findFloorByComment(maeligolf, "2HæðMeðVeggjum");
    var gluggar = walls.filter(function (w) { return w.type === "Gluggi"; });
    //   rooms.map(r => {
    //     console.log("Debug r.name: ", r.name);
    //     // console.log("Debug r: ", r);
    //     return r;
    //   });
    //   maeligolf.filter(f => {
    //     // console.log("Debug f: ", f);
    //     console.log("Debug f.comments: ", f.comments);
    //     return f.type === "Mæligólf";
    //   });
    var inngangsskjol = findRoomByName(rooms, "Inngangsskjól");
    var inngangsskjolBrutto = findFloorByComment(maeligolf, "Inngangsskjól");
    var idurgardur = findRoomByName(rooms, "Iðurgarður");
    var idurgardurBrutto = findFloorByComment(maeligolf, "Iðurgarður");
    var svalir = findRoomByName(rooms, "Svalir");
    var svalirFloor = findFloorByComment(maeligolf, "Svalir");
    var pallur = findRoomByName(rooms, "Pallur");
    var pallurBrutto = findFloorByComment(maeligolf, "Pallur");
    var idurpallur = findRoomByName(rooms, "Iðurpallur");
    var idurpallurBrutto = findFloorByComment(maeligolf, "Iðurpallur");
    var bilskurFloor = findFloorByComment(maeligolf, "Bílskúr");
    var hjolageymsla = findRoomByName(rooms, "Hjólageymsla");
    var hjolageymslaBrutto = findFloorByComment(maeligolf, "Hjólageymsla");
    var eldhus = findRoomByName(h2Rooms, "Eldhús");
    var stofa = findRoomByName(h2Rooms, "Stofa");
    var h3Volume = sumVolume(h3Rooms);
    var stigi1h = findRoomByName(h1Rooms, "Stigi");
    var stigiBilskur = {
        area: 2.05 * 1.2 + 0.6 * 0.3
    };
    var op = findRoomByName(h2Rooms.filter(function (r) { return r.level === "2. Hæð"; }), "Op");
    var bilskur = findRoomByName(h1Rooms, "Bílskúr");
    var vinnurymi = findRoomByName(h1Rooms, "Vinnurými");
    var idursvalir = findRoomByName(h2Rooms, "Iðursvalir");
    var idursvalirFloor = findFloorByComment(maeligolf, "Iðursvalir");
    var lowestPointOfRoof = 50.2;
    var highestPointOfRoof = 53.9;
    var middleSouthPointOnRoof = 51.9;
    var middleNorthPointOnRoof = 51;
    var nearTopSouthPointOnRoof = 53.6;
    var efstaBase = 46.5;
    var svaediEfstu = [
        customRoom_1.createCustomRoom({
            name: "s1",
            haedMax: middleSouthPointOnRoof - efstaBase,
            haedMin: lowestPointOfRoof - efstaBase,
            deltaLatitude: 3.75,
            deltaLongditude: 8
        }),
        customRoom_1.createCustomRoom({
            name: "s2",
            haedMax: highestPointOfRoof - efstaBase,
            haedMin: middleSouthPointOnRoof - efstaBase,
            deltaLatitude: 8 - 3.75,
            deltaLongditude: 8 + 5.25
        }),
        customRoom_1.createCustomRoom({
            name: "n1",
            haedMax: highestPointOfRoof - efstaBase,
            haedMin: middleNorthPointOnRoof - efstaBase,
            deltaLatitude: 8 - 1.5,
            deltaLongditude: 8 + 3.4
        }),
        customRoom_1.createCustomRoom({
            name: "n2",
            haedMax: middleNorthPointOnRoof - efstaBase,
            haedMin: lowestPointOfRoof - efstaBase,
            deltaLatitude: 1.5,
            deltaLongditude: 8
        }),
        customRoom_1.createCustomRoom({
            name: "n3",
            haedMax: highestPointOfRoof - efstaBase,
            haedMin: nearTopSouthPointOnRoof - efstaBase,
            deltaLatitude: 2.85,
            deltaLongditude: 0.45
        })
    ];
    var eignarhald = {
        h101: {
            sqrm: formatNumber(bilskur.area + vinnurymi.area)
        }
    };
    var gryfjaU18 = 1.2 * 3.4;
    var h2Volume = (h2Floor.area - stofa.area) * 3 + stofa.volume + h3Volume;
    var totalVolume = h1Floor.area * 3 + h2Volume;
    var botnplataM2 = h1Floor.area;
    var externalDoors = sumArea(doors
        .filter(function (d) { return d.type !== "1200 x 2100mm"; })
        .filter(function (d) { return d.type.indexOf("Innihurð") === -1; }));
    var utveggir = wall_1.groupWall(walls.filter(function (w) { return w.purpose === "Útveggur"; }));
    var þakgluggi = { area: 4.2 };
    return {
        timburklaedning: formatNumber(sumArea(walls.filter(function (w) { return w.materials.some(function (m) { return m.type === "Timbur"; }); }))),
        botnplataRooms: formatNumber(sumArea(h1Rooms) - idurgardur.area - inngangsskjol.area),
        botnplataFlatarmal: formatNumber(botnplataM2),
        utveggir: utveggir,
        gluggar: wall_1.groupWall(gluggar),
        cltExternalWalls: wall_1.groupWall(walls
            .filter(function (w) { return w.type.indexOf("CLT-15/15") !== -1; })
            .filter(function (w) { return w.purpose === "Útveggur"; })),
        stoneExternalWalls: wall_1.groupWall(walls
            .filter(function (w) { return w.type.indexOf("Steypt m.") !== -1; })
            .filter(function (w) { return w.purpose === "Útveggur"; })),
        þakFlotur: sumArea(roofs),
        gfDoors: sumArea(h1Doors) + sumArea(bilskurDoors),
        topDoors: sumArea(h2Doors),
        þakgluggar: þakgluggi.area,
        externalDoors: externalDoors,
        hjupveggir: utveggir.area + externalDoors,
        doorsAndWindowsArea: externalDoors + sumArea(gluggar) + þakgluggi.area,
        totalExternalArea: formatNumber(utveggir.area + externalDoors + sumArea(roofs) + botnplataM2),
        Einingar: {
            h1: {
                botnflotur: formatNumber(h1Floor.area - bilskurFloor.area),
                stigar: formatNumber(stigi1h.area),
                nettoflotur: formatNumber(sumArea(filterType(h1Rooms, "A")) -
                    stigi1h.area -
                    bilskur.area -
                    vinnurymi.area),
                botnplata: formatNumber(h1Floor.area)
            },
            bilskur: {
                botnflotur: formatNumber(bilskurFloor.area),
                nettoflotur: formatNumber(bilskur.area + vinnurymi.area) - stigiBilskur.area,
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
                nettoflotur: formatNumber(sumArea(filterType(h2Rooms, "A")) - op.area)
            },
            svalir: {
                nettoflotur: formatNumber(svalir.area),
                brutto: formatNumber(svalirFloor.area)
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
                nettoflotur: formatNumber(idurpallur.area + 0.4),
                brutto: formatNumber(idurpallurBrutto.area)
            },
            idursvalir: {
                nettoflotur: formatNumber(idursvalir.area),
                brutto: formatNumber(idursvalirFloor.area)
            },
            hjolageymsla: {
                nettoflotur: formatNumber(hjolageymsla.area),
                brutto: formatNumber(hjolageymslaBrutto.area)
            }
        }
    };
};
//# sourceMappingURL=calc.js.map