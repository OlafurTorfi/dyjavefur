import { AreaType } from "../data/materials";
import { Room } from "../model/room";
export const sumArea = (rooms: AreaType[]): number => {
  return rooms.reduce((prev, curr) => {
    return prev + curr.area;
  }, 0);
};

export const findByComment = (
  arr: Array<{ comments: string; area: number }>,
  comment: string
) => {
  const item = arr.find(r => {
    return r.comments === comment;
  });
  if (!item) {
    throw Error("Item " + comment + " not found");
  }
  return item;
};

export const getMaxHeight = (rooms: Room[]) => {
  return rooms.reduce((prev, curr) => {
    const hm = curr.heightMax;
    return Math.max(prev, curr.heightMax);
  }, 0);
};
export const getMinHeight = (rooms: Room[]) => {
  return rooms.reduce((prev, curr) => {
    const hm = curr.heightMin;
    return Math.min(prev, curr.heightMin);
  }, 999);
};
