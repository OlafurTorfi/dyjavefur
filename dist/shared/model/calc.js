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
exports.groupByTypeString = function (items, groups) {
    var result = groups.map(function (group) {
        var area = 0;
        var price = 0;
        var materials = [];
        var type = '';
        var family = '';
        var resistance = 0;
        var isolation = 0;
        items.forEach(function (item) {
            if (item.type.indexOf(group) !== -1) {
                console.log('item in group', group, ' found. ', item.area, ' big, type was ', item.type);
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
        var type = '';
        var family = '';
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
        throw Error('Room ' + name + ' not found');
    }
    return room;
};
var getH3Volume = function (bath) {
    var le = 9.3;
    var be = 8;
    var lw = 7.8;
    var bw = 7.85;
    var h1w = 51.4 - 49.5;
    var h2 = 54.1 - 49.5;
    var h1e = 51 - 49.5;
    var h3Plate = le * be + lw * bw + bath.area;
    console.log('Debug h3Plate: ', h3Plate);
    return le * be * (h1e + h2) / 2 + lw * bw * (h1w + h2) + bath.volume;
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
    var stigaFlotur = rooms.filter(function (r) { return r.name === 'Stigi'; }).reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var opFlotur = rooms.filter(function (r) { return r.name === 'Op'; }).reduce(function (prev, curr) {
        return prev + curr.area;
    }, 0);
    var aRooms = filterType(rooms, 'A');
    var bRooms = filterType(rooms, 'B');
    var cRooms = filterType(rooms, 'C');
    var aRoomsVolume = sumVolume(aRooms);
    var bRoomsVolume = sumVolume(bRooms);
    var aRoomsArea = sumArea(aRooms);
    var bRoomsArea = sumArea(bRooms);
    var findFloorByLevelAndType = function (floors, level, type) {
        var tempFloors = floors.filter(function (f) { return (f.level === level && f.type === type); });
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
    var getAverageHeight = function (rooms) {
        var totalVolume = rooms.reduce(function (prev, curr) {
            return prev + curr.avgHeight * curr.area;
        }, 0);
        var totalArea = rooms.reduce(function (prev, curr) {
            return prev + curr.area;
        }, 0);
        return totalVolume / totalArea;
    };
    var bilskurRooms = rooms.filter(function (r) { return r.level === 'Bílskúr'; });
    var h1Rooms = rooms.filter(function (r) { return r.level === '1. Hæð'; });
    var h2Rooms = rooms.filter(function (r) { return r.level === '2. Hæð'; });
    var h3Rooms = rooms.filter(function (r) { return r.level === '3. Hæð'; });
    var bilskurDoors = doors.filter(function (d) { return d.level === 'Bílskúr'; });
    var h1Doors = doors.filter(function (d) { return d.level === '1. Hæð'; });
    var h2Doors = doors.filter(function (d) { return d.level === '2. Hæð'; });
    var h3Doors = doors.filter(function (d) { return d.level === '3. Hæð'; });
    var gluggar = walls.filter(function (w) { return w.type === 'Gluggi'; });
    var inngangsskjol = findRoomByName(bRooms, 'Inngangsskjól');
    var idurgardur = findRoomByName(bRooms, 'Iðurgarður');
    var svalir = findRoomByName(cRooms, 'Svalir');
    var pallur = findRoomByName(cRooms, 'Pallur');
    var idursvalir = findRoomByName(bRooms, 'Iðursvalir');
    var idurpallur = findRoomByName(bRooms, 'Iðurpallur');
    var solskyli = findRoomByName(cRooms, 'Sólskýli');
    var eldhus = findRoomByName(h2Rooms, 'Eldhús');
    var stofa = findRoomByName(h2Rooms, 'Stofa');
    var bath3h = findRoomByName(h3Rooms, 'Bað');
    var stigi1h = findRoomByName(h1Rooms, 'Stigi');
    var stigi2h = findRoomByName(h2Rooms, 'Stigi');
    var stigi3h = findRoomByName(h3Rooms, 'Stigi');
    var op = findRoomByName(h2Rooms.filter(function (r) { return r.level === '2. Hæð'; }), 'Op');
    var bilskursStigiArea = 750 * 1100 / 1000000;
    var burdarvirkiArea = 11.2;
    var sudArea = 11.1;
    var bilskurFloor = findFloorByLevelAndType(floors, 'Bílskúr', 'Generic 150mm');
    var h1Floor = findFloorByLevelAndType(floors, '1. Hæð', 'Generic 150mm');
    var h2Floor = findFloorByLevelAndType(floors, '2. Hæð', 'Generic 150mm');
    var h3Floor = findFloorByLevelAndType(floors, '3. Hæð', 'CLT Floor');
    var h2Volume = (h2Floor.area - eldhus.area - stofa.area) * 3 + eldhus.volume + stofa.volume;
    var h3Volume = getH3Volume(bath3h);
    var totalVolume = bilskurFloor.area * 3.6 + h1Floor.area * 3 + h2Volume + h3Volume;
    var botnfloturM2 = sumArea(floors.filter(function (f) { return f.type === 'CLT Floor' || f.type === 'Generic 150mm'; }));
    var botnplataM2 = bilskurFloor.area + h1Floor.area;
    // console.log('Debug bilskurRooms: ', rooms);
    return {
        botnplataRooms: formatNumber(sumArea(h1Rooms) + sumArea(bilskurRooms) - idurgardur.area - inngangsskjol.area),
        botnplataRummal: formatNumber(botnplataM2 * 0.2),
        botnplataFlatarmal: formatNumber(botnplataM2),
        utveggir: wall_1.groupWall(walls.filter(function (w) { return w.purpose === 'Útveggur'; })),
        gluggar: wall_1.groupWall(gluggar),
        cltExternalWalls: wall_1.groupWall(walls.filter(function (w) { return w.type.indexOf('CLT-15/15') !== -1; }).filter(function (w) { return w.purpose === 'Útveggur'; })),
        stoneExternalWalls: wall_1.groupWall(walls.filter(function (w) { return w.type.indexOf('Steypt m.') !== -1; }).filter(function (w) { return w.purpose === 'Útveggur'; })),
        þakFlotur: sumArea(roofs),
        gfDoors: sumArea(h1Doors) + sumArea(bilskurDoors),
        topDoors: sumArea(h2Doors) + sumArea(h3Doors),
        externalDoors: sumArea(doors.filter(function (d) { return d.type !== '1200 x 2100mm'; }).filter(function (d) { return d.type.indexOf('Innihurð') === -1; })),
        þakgluggar: 0,
        A: {
            Botnflotur: formatNumber(botnfloturM2),
            Bruttoflotur: formatNumber(botnfloturM2 - opFlotur),
            Bruttorummal: totalVolume,
            Nettoflotur: sumArea(aRooms),
            BirtFlatarmal: 0,
            Skiptarummal: 0
        },
        B: {
            Botnflotur: sumArea(bRooms),
            Bruttoflotur: sumArea(bRooms),
            Bruttorummal: sumVolume(filterType(rooms, 'B')),
        },
        C: {
            Botnflotur: sumArea(filterType(rooms, 'C')),
            Bruttoflotur: sumArea(filterType(rooms, 'C')),
        },
        total: {
            Botnflotur: 0,
            Bruttoflotur: 0,
            Bruttorummal: 0,
            Nettoflotur: 0,
            BirtFlatarmal: 0,
            Skiptarummal: 0
        },
        Einingar: {
            h1: {
                botnflotur: formatNumber(h1Floor.area),
                stigar: formatNumber(stigi1h.area + bilskursStigiArea),
                nettoflotur: formatNumber(sumArea(filterType(h1Rooms, 'A')) - stigi1h.area)
            },
            bilskur: {
                botnflotur: formatNumber(bilskurFloor.area),
                u18: formatNumber(burdarvirkiArea),
                nettoflotur: formatNumber(sumArea(filterType(bilskurRooms, 'A')) - bilskursStigiArea)
            },
            inngangsskjól: {
                botnflotur: formatNumber(inngangsskjol.area)
            },
            idurgardur: {
                botnflotur: formatNumber(idurgardur.area)
            },
            h2: {
                botnflotur: formatNumber(h2Floor.area - svalir.area - idursvalir.area - pallur.area - idurpallur.area),
                stigar: formatNumber(stigi2h.area),
                op: formatNumber(stigi1h.area + op.area),
                shMax: formatNumber(getMaxHeight(h2Rooms)),
                shMin: formatNumber(getMinHeight(h2Rooms)),
                avgHeight: formatNumber(getAverageHeight(h2Rooms)),
                nettoflotur: formatNumber(sumArea(filterType(h2Rooms, 'A')) - stigi2h.area - op.area)
            },
            svalir: {
                botnflotur: formatNumber(svalir.area)
            },
            pallur: {
                botnflotur: formatNumber(pallur.area)
            },
            Idurpallur: {
                botnflotur: formatNumber(idurpallur.area)
            },
            idursvalir: {
                botnflotur: formatNumber(idursvalir.area)
            },
            h3: {
                botnflotur: formatNumber(h3Floor.area - solskyli.area + stigi3h.area),
                op: formatNumber(stigi3h.area),
                u18: formatNumber(sudArea),
                shMax: formatNumber(getMaxHeight(h3Rooms)),
                shMin: formatNumber(getMinHeight(h3Rooms)),
                avgHeight: formatNumber(getAverageHeight(h3Rooms)),
                nettoflotur: formatNumber(sumArea(filterType(h3Rooms, 'A')) - stigi3h.area)
            },
            solskyli: {
                botnflotur: formatNumber(solskyli.area)
            }
        }
    };
};
//# sourceMappingURL=calc.js.map