import { getFloors } from "../components/floor";
import { expect } from 'chai'

describe("Door tests", () => {
    it("should fetch floors from postgres", () => {
        return getFloors().then(res => {
            expect(res.length).to.be.greaterThan(0)
            res.forEach(floor => {
                expect(floor.price).to.be.greaterThan(0)
            })
        })
    });
});