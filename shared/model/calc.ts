import { createGetDoors, Door } from "./door";
import { createGetWalls, Wall, groupWall } from "./wall";
import { createGetFloors, Floor } from "./floor";
import { createGetRoofs, Roof } from "./roof";
import { Room } from "./room";
import { DB } from "../db";
import {
  MaterialType,
  Material,
  MaterialAmount,
  AreaType,
  LevelType
} from "../data/materials";
import { LookupAddress } from "dns";
import { format } from "url";
import { currentId } from "async_hooks";
import { ICustomRoom, createCustomRoom } from "./customRoom";

export const createGetPrice = (
  doorDB: any,
  floorDB: any,
  roofDB: any,
  wallDB: any
) => {
  const getDoors = doorDB as () => Promise<Door[]>; // createGetDoors(doorDB).query
  const getFloors = floorDB as () => Promise<Floor[]>; // createGetFloors(floorDB).query
  const getRoofs = roofDB as () => Promise<Roof[]>; // createGetRoofs(roofDB).query
  const getWalls = wallDB as () => Promise<Wall[]>; // createGetWalls(wallDB).query
  return {
    getPrice: async (): Promise<number> => {
      const doors = await getDoors();
      const doorPrice = doors.reduce((prev, curr) => {
        return prev + curr.price;
      }, 0);
      console.log("price of doors ", doorPrice);
      const walls = await getWalls();
      const wallPrice = walls.reduce((prev, curr) => {
        return prev + (curr.price ? curr.price : 0);
      }, 0);
      console.log("price of walls ", wallPrice);
      const floors = await getFloors();
      const floorPrice = floors.reduce((prev, curr) => {
        return prev + (curr.price ? curr.price : 0);
      }, 0);
      console.log("price of floors ", floorPrice);
      const roofs = await getRoofs();
      const roofPrice = roofs.reduce((prev, curr) => {
        return prev + (curr.price ? curr.price : 0);
      }, 0);
      console.log("price of roofs ", roofPrice);
      return floorPrice + doorPrice + wallPrice + roofPrice;
    }
  };
};
export const groupByTypeString = (items: MaterialType[], groups: string[]) => {
  const result: MaterialType[] = groups.map(group => {
    let area: number = 0;
    let price: number = 0;
    let materials: MaterialAmount[] = [];
    let type: string = "";
    let family: string = "";
    let resistance: number = 0;
    let isolation: number = 0;
    items.forEach(item => {
      if (item.type.indexOf(group) !== -1) {
        console.log(
          "item in group",
          group,
          " found. ",
          item.area,
          " big, type was ",
          item.type
        );
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
      type,
      area,
      price,
      materials,
      family,
      resistance,
      isolation
    };
  });
  return result;
};
export const groupByType = (items: MaterialType[]) => {
  const distinct: string[] = [];

  items.forEach(item => {
    if (distinct.indexOf(item.type) === -1) {
      distinct.push(item.type);
    }
  });

  const result: MaterialType[] = distinct.map(dist => {
    let area: number = 0;
    let price: number = 0;
    let materials: MaterialAmount[] = [];
    let type: string = "";
    let family: string = "";
    let resistance: number = 0;
    let isolation: number = 0;
    items.forEach(item => {
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
      type,
      area,
      price,
      materials,
      family,
      resistance,
      isolation
    };
  });
  return result;
};

export const groupAll = (items: MaterialType[]) => {
  return items.reduce(
    (prev, curr) => {
      return { price: prev.price + curr.price, area: prev.area + curr.area };
    },
    { price: 0, area: 0 }
  );
};
const sumArea = (rooms: AreaType[]) => {
  return rooms.reduce((prev, curr) => {
    return prev + curr.area;
  }, 0);
};
const formatNumber = (num: number) => {
  return Math.floor(num * 10) / 10;
};
const sumVolume = (rooms: Room[]) => {
  return formatNumber(
    rooms.reduce((prev, curr) => {
      return prev + curr.volume;
    }, 0)
  );
};
const filterType = (rooms: Room[], type: string) => {
  rooms.forEach(r => console.log);
  return rooms.filter(room => room.type === type);
};
const findRoomByName = (rooms: Room[], name: string) => {
  const room = rooms.find(r => {
    return r.name === name;
  });
  if (!room) {
    throw Error("Room " + name + " not found");
  }
  return room;
};
const findDoorByTypeName = (doors: Door[], type: string) => {
  const door = doors.find(d => {
    return d.type === type;
  });
  if (!door) {
    throw Error("door " + name + " not found");
  }
  return door;
};
const findFloorByComment = (floors: Floor[], comment: string) => {
  const floor = floors.find(f => {
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
const findFloorByLevelAndType = (
  floors: Floor[],
  level: string,
  type: string
) => {
  const tempFloors = floors.filter(f => {
    return f.level === level && f.type === type;
  });
  return tempFloors[0];
};
const getMaxHeight = (rooms: Room[]) => {
  return rooms.reduce((prev, curr) => {
    const hm = curr.heightMax;
    return Math.max(prev, curr.heightMax);
  }, 0);
};
const getMinHeight = (rooms: Room[]) => {
  return rooms.reduce((prev, curr) => {
    const hm = curr.heightMin;
    return Math.min(prev, curr.heightMin);
  }, 999);
};

export interface Eining {
  botnflotur: number;
  milliflotur?: number;
  nettoflotur?: number;
  stigar?: number;
  op?: number;
  u18?: number;
  shMin?: number;
  shMax?: number;
  bruttoVolume: number;
}

export const calculateMatshlutar = (
  rooms: Room[],
  walls: Wall[],
  roofs: Roof[],
  floors: Floor[],
  doors: Door[]
) => {
  const levels = rooms.reduce(
    (prev, curr) => {
      if (prev.indexOf(curr.level) === -1) {
        return prev.concat(curr.level);
      } else {
        return prev;
      }
    },
    [] as string[]
  );
  const stigaFlotur = rooms
    .filter(r => r.name === "Stigi")
    .reduce((prev, curr) => {
      return prev + curr.area;
    }, 0);
  const opFlotur = rooms.filter(r => r.name === "Op").reduce((prev, curr) => {
    return prev + curr.area;
  }, 0);

  const bilskurRooms = rooms.filter(r => r.level === "Bílgeymsla");
  const h1Rooms = rooms.filter(r => r.level === "1. Hæð");
  const h2Rooms = rooms.filter(r => r.level === "2. Hæð");
  const h3Rooms = rooms.filter(r => r.level === "Háaloft");

  const bilskurDoors = doors.filter(d => d.type === "5000 x 2400mm");
  const h1Doors = doors.filter(d => d.level === "1. Hæð");
  const h2Doors = doors.filter(d => d.level === "2. Hæð");
  const h3Doors = doors.filter(d => d.level === "Háaloft");
  const h3Floor = findFloorByLevelAndType(floors, "Háaloft", "CLT Floor");
  const maeligolf = floors.filter(f => f.type === "Mæligólf");
  const h1Floor = findFloorByComment(maeligolf, "1HæðMeðVeggjum");
  const h2Floor = findFloorByComment(maeligolf, "2HæðMeðVeggjum");

  const gluggar = walls.filter(w => w.type === "Gluggi");
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
  const inngangsskjol = findRoomByName(rooms, "Inngangsskjól");
  const inngangsskjolBrutto = findFloorByComment(maeligolf, "Inngangsskjól");
  const idurgardur = findRoomByName(rooms, "Iðurgarður");
  const idurgardurBrutto = findFloorByComment(maeligolf, "Iðurgarður");
  const svalir = findRoomByName(rooms, "Svalir");
  const svalirFloor = findFloorByComment(maeligolf, "Svalir");
  const pallur = findRoomByName(rooms, "Pallur");
  const pallurBrutto = findFloorByComment(maeligolf, "Pallur");
  const idurpallur = findRoomByName(rooms, "Iðurpallur");
  const idurpallurBrutto = findFloorByComment(maeligolf, "Iðurpallur");
  const bilskurFloor = findFloorByComment(maeligolf, "Bílskúr");
  const hjolageymsla = findRoomByName(rooms, "Hjólageymsla");
  const geymsla = findRoomByName(rooms, "Geymsla");
  const hjolageymslaBrutto = findFloorByComment(maeligolf, "Hjólageymsla");
  const eldhus = findRoomByName(h2Rooms, "Eldhús");
  const stofa = findRoomByName(h2Rooms, "Stofa");
  const h3Volume = sumVolume(h3Rooms);
  const stigi1h = findRoomByName(h1Rooms, "Stigi");
  const stigiBilskur = {
    area: 2.05 * 1.2 + 0.6 * 0.3
  };
  const op = findRoomByName(h2Rooms.filter(r => r.level === "2. Hæð"), "Op");
  const bilskur = findRoomByName(h1Rooms, "Bílgeymsla");
  const vinnurymi = findRoomByName(h1Rooms, "Vinnu/Föndur-rými");
  const idursvalirFloor = findFloorByComment(maeligolf, "Iðursvalir");
  const lowestPointOfRoof = 50.2;
  const highestPointOfRoof = 53.9;
  const middleSouthPointOnRoof = 51.9;
  const middleNorthPointOnRoof = 51;
  const nearTopSouthPointOnRoof = 53.6;
  const efstaBase = 46.5;
  const svaediEfstu: ICustomRoom[] = [
    createCustomRoom({
      name: "s1",
      haedMax: middleSouthPointOnRoof - efstaBase,
      haedMin: lowestPointOfRoof - efstaBase,
      deltaLatitude: 3.75,
      deltaLongditude: 8
    }),
    createCustomRoom({
      name: "s2",
      haedMax: highestPointOfRoof - efstaBase,
      haedMin: middleSouthPointOnRoof - efstaBase,
      deltaLatitude: 8 - 3.75,
      deltaLongditude: 8 + 5.25
    }),
    createCustomRoom({
      name: "n1",
      haedMax: highestPointOfRoof - efstaBase,
      haedMin: middleNorthPointOnRoof - efstaBase,
      deltaLatitude: 8 - 1.5,
      deltaLongditude: 8 + 3.4
    }),
    createCustomRoom({
      name: "n2",
      haedMax: middleNorthPointOnRoof - efstaBase,
      haedMin: lowestPointOfRoof - efstaBase,
      deltaLatitude: 1.5,
      deltaLongditude: 8
    }),
    createCustomRoom({
      name: "n3",
      haedMax: highestPointOfRoof - efstaBase,
      haedMin: nearTopSouthPointOnRoof - efstaBase,
      deltaLatitude: 2.85,
      deltaLongditude: 0.45
    })
  ];

  const eignarhald = {
    h101: {
      sqrm: formatNumber(bilskur.area + vinnurymi.area)
    }
  };

  const gryfjaU18 = 1.2 * 3.4;
  const gryfja = {
    netto: 1 * 4.25,
    brutto: 1.4 * 4.6
  };

  const h2Volume = (h2Floor.area - stofa.area) * 3 + stofa.volume + h3Volume;

  const totalVolume = h1Floor.area * 3 + h2Volume;

  const botnplataM2 = h1Floor.area;

  const externalDoors = sumArea(
    doors
      .filter(d => d.type !== "1200 x 2100mm")
      .filter(d => d.type.indexOf("Innihurð") === -1)
  );
  const utveggir = groupWall(walls.filter(w => w.purpose === "Útveggur"));
  const þakgluggi = { area: 4.2 };
  const nettofloturH1 = formatNumber(
    sumArea(filterType(h1Rooms, "A")) -
      stigi1h.area -
      bilskur.area -
      vinnurymi.area -
      geymsla.area
  );
  const nettofloturBilskur =
    formatNumber(bilskur.area + vinnurymi.area + geymsla.area) -
    stigiBilskur.area;
  return {
    timburklaedning: formatNumber(
      sumArea(walls.filter(w => w.materials.some(m => m.type === "Timbur")))
    ),
    botnplataRooms: formatNumber(
      sumArea(h1Rooms) - idurgardur.area - inngangsskjol.area
    ),
    botnplataFlatarmal: formatNumber(botnplataM2),
    utveggir,
    gluggar: groupWall(gluggar),
    cltExternalWalls: groupWall(
      walls
        .filter(w => w.type.indexOf("CLT-15/15") !== -1)
        .filter(w => w.purpose === "Útveggur")
    ),
    cltInternalWalls: groupWall(
      walls.filter(w => w.type === "CLT150mm" || w.type === "CLT100mm")
    ),
    stoneExternalWalls: groupWall(
      walls
        .filter(w => w.type.indexOf("Steypt m.") !== -1)
        .filter(w => w.purpose === "Útveggur")
    ),
    cltFloors: sumArea(floors.filter(f => f.type === "CLT Floor")),
    þakFlotur: sumArea(roofs),
    gfDoors: sumArea(h1Doors) + sumArea(bilskurDoors),
    topDoors: sumArea(h2Doors),
    þakgluggar: þakgluggi.area,
    externalDoors,
    hjupveggir: utveggir.area + externalDoors,
    doorsAndWindowsArea: externalDoors + sumArea(gluggar) + þakgluggi.area,
    totalExternalArea: formatNumber(
      utveggir.area + externalDoors + sumArea(roofs) + botnplataM2
    ),

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
        botnfloturChecksum: formatNumber(
          svaediEfstu.reduce(
            (prev, curr) => curr.deltaLatitude * curr.deltaLongditude + prev,
            0
          )
        ),
        op: formatNumber(op.area),
        shMax: formatNumber(
          svaediEfstu.reduce((prev, curr) => Math.max(prev, curr.haedMax), 0)
        ),
        shMin: formatNumber(
          svaediEfstu.reduce((prev, curr) => Math.min(prev, curr.haedMax), 666)
        ),
        avgHeight: formatNumber(
          svaediEfstu.reduce((prev, curr) => curr.volume + prev, 0) /
            svaediEfstu.reduce(
              (prev, curr) => curr.deltaLatitude * curr.deltaLongditude + prev,
              0
            )
        ),
        volume: formatNumber(
          svaediEfstu.reduce((prev, curr) => curr.volume + prev, 0)
        ),
        nettoflotur: formatNumber(sumArea(filterType(h2Rooms, "A")) - op.area)
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
      idursvalir: {
        nettoflotur: formatNumber(svalir.area),
        brutto: formatNumber(idursvalirFloor.area + svalirFloor.area)
      },
      hjolageymsla: {
        nettoflotur: formatNumber(hjolageymsla.area),
        brutto: formatNumber(hjolageymslaBrutto.area)
      },
      skridkjallari: {
        netto: formatNumber(nettofloturH1 + nettofloturBilskur - gryfja.brutto),
        brutto: formatNumber(h1Floor.area - gryfja.netto)
      }
    }
  };
};
