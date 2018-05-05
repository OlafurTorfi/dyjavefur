import { getWalls } from "../components/wall";
import { expect } from "chai";

describe("Wall tests", () => {
  it("should fetch walls from postgres", () => {
    return getWalls().then(res => {
      expect(res.length).to.be.greaterThan(0);
      res.forEach(wall => {
        expect(wall.price).to.be.greaterThan(0);
      });
    });
  });
});
