import { getPrice } from '../components/calc'
import { expect } from 'chai'

describe('calculate test', () => {
    it('should be able to calculate total price', () => {
        return getPrice().then(cost => {
            console.log('total cost of the house so far is ', cost);
            expect(cost).to.be.greaterThan(0)
        })
    })
})
