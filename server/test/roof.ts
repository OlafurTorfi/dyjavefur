import { getRoofs } from "../components/roof";
import { expect } from "chai";

describe("Door tests", () => {
  it("should fetch Roofs from postgres", () => {
    return getRoofs().then(res => {
      expect(res.length).to.be.greaterThan(0);
      res.forEach(roof => {
        expect(roof.price).to.be.greaterThan(0);
      });
    });
  });
});
