
import * as React from "react";
import * as ReactDOM from "react-dom";
import { getDoors } from "../components/door";
import { expect } from 'chai'

describe("Door tests", () => {
    it("should fetch doors from postgres", () => {
        return getDoors().then(res => {
            expect(res.length).to.be.greaterThan(0)
            res.forEach(door => {
                expect(door.price).to.be.greaterThan(0)
            })
        })
    });
});