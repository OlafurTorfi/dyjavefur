import { getRooms } from "../components/room";
import { expect } from 'chai'

describe("Room tests", () => {
    it("should fetch Room from postgres", () => {
        return getRooms().then(res => {
            expect(res.length).to.be.greaterThan(0)
            res.forEach(room => {
                expect(room.volume).to.be.greaterThan(0)
            })
        })
    });
});