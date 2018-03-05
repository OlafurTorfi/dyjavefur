import * as assert from 'assert'
import { query } from '../db'
import { materials } from './materials'

export interface WallMaterial { type: string, amount: number }
export interface Wall { type: string, materials: Array<WallMaterial>, price?: number }

const wallPrices: Wall[] = [
    {
        type: 'Varmamót-5/20/5 - Völun',
        materials: [
            { amount: 1, type: 'Gips' },
            { amount: 1, type: 'Múrklæðning' },
            { type: 'Steypa', amount: 0.2 },
        ]
    },
    {
        type: 'Interior - gipsklætt timbur/stálull',
        materials: [{
            type: 'Gips', amount: 2
        },
        {
            type: 'Timbur', amount: 1
        }
        ]
    },
    {
        type: 'Generic - 150mm',
        materials: [
            { type: 'Steypa', amount: 0.15 }
        ]
    },
    {
        type: 'Varmamót-5/15/5-Völun',
        materials: [
            { type: 'Völun', amount: 1 },
            { type: 'Steypa', amount: 0.15 },
            { type: 'Gips', amount: 1 }]
    },
    {
        type: 'Varmamót-5/20/5 - Sökkull',
        materials: [
            { type: 'Tjöruolía', amount: 1 },
            { type: 'Steypa', amount: 0.2 }
        ]
    },
    {
        type: 'Varmamót-5/15/5-timburáferð',
        materials: [
            { type: 'Timbur', amount: 1 },
            { type: 'Steinull', amount: 1 },
            { type: 'Steypa', amount: 0.15 },
            { type: 'Gips', amount: 1 }]
    },
    {
        type: 'Generic - 200mm',
        materials: [
            { type: 'Steypa', amount: 0.2 }]
    },
    {
        type: 'Steypt m. Cembrit 20/10',
        materials: [
            { type: 'Cembrit', amount: 1 },
            { type: 'Steypa', amount: 0.2 },
            { type: 'Leiðarar', amount: 1 },
            { type: 'Skrúfur', amount: 1 }]
    },
    {
        type: 'Steypt m. timbri 20/10',
        materials: [
            { type: 'Steinull', amount: 1 },
            { type: 'Steypa', amount: 0.2 },
            { type: 'Gips', amount: 1 }]
    },
    {
        type: 'Gluggi',
        materials: [
            { type: 'Gler', amount: 1 },
            { type: 'Ál-listar', amount: 6 }]
    }
]
export const getWalls = async (): Promise<Wall[]> => {
    const res = await query(`select "Area", "Length", "FamilyName", "TypeName", "Width" from "Walls" as w
    join "WallTypes" as wt on w."TypeId"=wt."Id"`)

    const walls = res.rows.map(wall => {
        const wallPrice = wallPrices.find(wallp => { return wallp.type === wall.TypeName })
        assert(wallPrice, 'no price found for ' + wall.TypeName)
        const calc = wallPrice && wallPrice.materials.reduce((prev, curr) => {
            const materialprice = materials.find(materialp => materialp.type === curr.type)
            assert(materialprice, 'no price found for ' + curr.type)
            return prev + curr.amount * (materialprice ? materialprice.price : 0)

        }, 0)
        return Object.assign({
            price: calc
        }, wall)
    })
    return walls
}
