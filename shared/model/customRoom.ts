export interface ICreateCustomRoomInput {
  name: string;
  haedMax: number;
  haedMin: number;
  deltaLatitude: number;
  deltaLongditude: number;
}

export interface ICustomRoom extends ICreateCustomRoomInput {
  volume: number;
  area: number;
}

export const calculateUpperFloorVolume = () => {
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
  return svaediEfstu;
};

export const createCustomRoom = (params: ICreateCustomRoomInput) => {
  const area = params.deltaLatitude * params.deltaLongditude;
  const room = {
    ...params,
    volume: ((params.haedMax + params.haedMin) / 2) * area,
    area
  };
  return room;
};
