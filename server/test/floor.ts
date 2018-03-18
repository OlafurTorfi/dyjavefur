import { getFloors } from "../components/floor";
import { expect } from 'chai'
// import { writeFileSync } from 'fs'

describe("Floor tests", () => {
    it("should fetch floors from postgres", () => {
        return getFloors().then(res => {
            expect(res.length).to.be.greaterThan(0)
            // writeFileSync(__dirname + '/../../../export/floors.json', JSON.stringify(res.map(f => {
            //     return { type: f.type, level: f.level, area: f.area }
            // })))
            res.forEach(floor => {
                expect(floor.price).to.be.greaterThan(0)
                expect(floor.area).to.be.greaterThan(0)
                expect(floor.level.length).to.be.greaterThan(0)
                expect(floor.type.length).to.be.greaterThan(0)
            })
        })
    });
});