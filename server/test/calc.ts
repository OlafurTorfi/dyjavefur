import { getPrice, groupAll, groupByType } from '../components/calc'
import { expect } from 'chai'
import { AreaType } from '../components/materials'
import { getWalls } from '../components/wall'

describe('calculate test', () => {
    const example: AreaType[] = [{
        price: 1,
        area: 2,
        family: 'Basic Roof',
        type: 'Generic - 400mm',
        materials: []
    },
    {
        price: 10,
        area: 20,
        family: 'Basic Roof',
        type: 'Generic - 400mm',
        materials: []
    },
    {
        price: 100,
        area: 200,
        family: 'Basic Roof',
        type: 'Other Roof',
        materials: []
    }]
    it('should be able to calculate total price', () => {
        return getPrice().then(cost => {
            console.log('total cost of the house so far is ', cost);
            expect(cost).to.be.greaterThan(0)
        })
    })
    it('should be able to group by type', () => {
        const grouped = groupByType(example)
        expect(grouped).to.deep.eq([
            { price: 11, area: 22, family: 'Basic Roof', type: 'Generic - 400mm', materials: [] },
            { price: 100, area: 200, family: 'Basic Roof', type: 'Other Roof', materials: [] }
        ])
    })
    it('should be able to group all', () => {
        const grouped = groupAll(example)
        expect(grouped).to.deep.eq({ price: 111, area: 222 })
    })
    it('should get walls, group by type and print average', () => {
        return getWalls().then(walls => {
            const grouped = groupByType(walls)
            grouped.forEach(wall => {
                const average = wall.price / wall.area
                expect(average).to.be.greaterThan(2000)
                console.log('The house has ', wall.area, ' of ', wall.type, '. Total price: ', wall.price, '. Average price: ', average)
            })
        })
    })
})
