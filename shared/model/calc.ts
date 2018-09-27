import { createGetDoors, Door } from "./door";
import { createGetWalls, Wall, groupWall } from "./wall";
import { createGetFloors, Floor } from "./floor";
import { createGetRoofs, Roof } from "./roof";
import { Room } from "./room";
import { DB } from "../db";
import { MaterialType, MaterialAmount, AreaType } from "../data/materials";
import { sumArea } from "./util";
import {
  ICustomRoom,
  createCustomRoom,
  calculateUpperFloorVolume
} from "./customRoom";

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
const findRoomByNumber = (rooms: Room[], num: number) => {
  const room = rooms.find(r => {
    return r.number === num;
  });
  if (!room) {
    throw Error("Room number:" + num + " not found");
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
  const stigaFlotur = rooms
    .filter(r => r.name === "Stigi")
    .reduce((prev, curr) => {
      return prev + curr.area;
    }, 0);
  const opFlotur = rooms.filter(r => r.name === "Op").reduce((prev, curr) => {
    return prev + curr.area;
  }, 0);

  const h1Rooms = rooms.filter(r => r.level === "1. Hæð");
  const h2Rooms = rooms.filter(r => r.level === "2. Hæð");

  const bilskurDoors = doors.filter(d => d.type === "5000 x 2400mm");
  const h1Doors = doors.filter(d => d.level === "1. Hæð");
  const h2Doors = doors.filter(d => d.level === "2. Hæð");
  const maeligolf = floors.filter(f => f.type === "Mæligólf");
  const h1Floor = findFloorByComment(maeligolf, "1HæðMeðVeggjum");
  const h2Floor = findFloorByComment(maeligolf, "2HæðMeðVeggjum");

  const gluggar = walls.filter(w => w.type === "Gluggi");
  const inngangsskjol = findRoomByName(rooms, "Inngangsskjól");
  const inngangsskjolBrutto = findFloorByComment(maeligolf, "Inngangsskjól");
  const idurgardur = findRoomByName(rooms, "Iðurgarður");
  const idurgardurBrutto = findFloorByComment(maeligolf, "Iðurgarður");
  const idursvalirFloor = findFloorByComment(maeligolf, "Iðursvalir");
  const svalir = findRoomByNumber(rooms, 178);
  const svalirFloor = findFloorByComment(maeligolf, "Svalir");
  const pallur = findRoomByNumber(rooms, 123);
  const pallurBrutto = findFloorByComment(maeligolf, "Pallur");
  const idurpallur = findRoomByNumber(rooms, 143);
  const idurpallurBrutto = findFloorByComment(maeligolf, "Iðurpallur");
  const bilskurFloor = findFloorByComment(maeligolf, "Bílskúr");
  const geymsla = findRoomByName(rooms, "Geymsla");
  const stigi1h = findRoomByName(h1Rooms, "Stigi");
  const stigiBilskur = {
    area: 2.05 * 1.2 + 0.6 * 0.3
  };
  const op = findRoomByName(h2Rooms.filter(r => r.level === "2. Hæð"), "Op");
  const bilskur = findRoomByName(h1Rooms, "Bílgeymsla");
  const vinnurymi = findRoomByName(h1Rooms, "Vinnu/Föndur-rými");

  const gryfja = {
    netto: 1 * 4.25,
    brutto: 1.3 * 4.4,
    stigi: 2 * 1
  };
  const svaediEfstu = calculateUpperFloorVolume();
  const skridkjallariVolume = h1Floor.area * 1.7;
  const h1Volume =
    (h1Floor.area - bilskurFloor.area) * 3 + bilskurFloor.area * 3.6;
  const h2Volume = svaediEfstu.reduce((prev, curr) => curr.volume + prev, 0);

  const externalDoors = sumArea(
    doors
      .filter(d => d.type !== "1200 x 2100mm")
      .filter(d => d.type.indexOf("Innihurð") === -1)
  );
  const utveggir = groupWall(walls.filter(w => w.purpose === "Útveggur"));
  const þakgluggi = { area: 4.2 + 0.9 };
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
    botnplataRooms: formatNumber(
      sumArea(h1Rooms) - idurgardur.area - inngangsskjol.area
    ),
    botnplataFlatarmal: formatNumber(h1Floor.area),
    // taka út þakskegg og hafa sér
    þakFlotur: sumArea(roofs),
    þakgluggar: þakgluggi.area,
    // gera með nýju comment aðferðinni
    hjupveggir: utveggir.area + externalDoors,
    doorsAndWindowsArea: externalDoors + sumArea(gluggar) + þakgluggi.area,
    totalExternalArea: formatNumber(
      utveggir.area + externalDoors + sumArea(roofs) + h1Floor.area
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
      skridkjallari: {
        netto: formatNumber(nettofloturH1 + nettofloturBilskur - gryfja.brutto),
        brutto: formatNumber(h1Floor.area - gryfja.netto)
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
