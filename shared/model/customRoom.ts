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

export const createCustomRoom = (params: ICreateCustomRoomInput) => {
  const room = {
    ...params,
    volume:
      (params.haedMax + params.haedMin) /
      2 *
      params.deltaLatitude *
      params.deltaLongditude,
    area: params.deltaLatitude * params.deltaLongditude
  };
  console.log("Debug room: ", room);
  return room;
};
