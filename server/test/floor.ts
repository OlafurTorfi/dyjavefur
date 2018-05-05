import { getFloors } from "../components/floor";
import { expect } from "chai";

describe("Floor tests", () => {
  it("should fetch floors from postgres", () => {
    return getFloors().then(res => {
      expect(res.length).to.be.greaterThan(0);
      res.forEach(floor => {
        expect(floor.area).to.be.greaterThan(0);
        expect(floor.level.length).to.be.greaterThan(0);
        expect(floor.type.length).to.be.greaterThan(0);
      });
    });
  });
});
