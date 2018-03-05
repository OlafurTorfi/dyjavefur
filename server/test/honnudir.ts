import { getHonnudir } from '../adaluppdrattur/honnudir'
import { expect } from 'chai'

describe('honnudir test', () => {
    it('should fetch honnudir', () => {
        const honnudir = getHonnudir()
        expect(honnudir.length).to.be.greaterThan(0)
    })
})