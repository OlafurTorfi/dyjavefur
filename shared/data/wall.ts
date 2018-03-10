import { MaterialAmount } from './materials'
export const wallChoices: { type: string, materials: MaterialAmount[] }[] = [
    {
        type: 'Varmamót-5/20/5 - Völun',
        materials: [
            { amount: 1, type: 'Gips' },
            { amount: 1, type: 'Múrklæðning' },
            { type: 'Steypa', amount: 0.2 },
            { type: 'Varmamót', amount: 1 / (1.2 * 0.3) }
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
            { type: 'Gips', amount: 1 },
            { type: 'Varmamót', amount: 1 / (1.2 * 0.3) }
        ]
    },
    {
        type: 'Varmamót-5/20/5 - Sökkull',
        materials: [
            { type: 'Tjöruolía', amount: 1 },
            { type: 'Steypa', amount: 0.2 },
            { type: 'Varmamót', amount: 1 / (1.2 * 0.3) }
        ]
    },
    {
        type: 'Varmamót-5/15/5-timburáferð',
        materials: [
            { type: 'Timbur', amount: 1 },
            { type: 'Steinull', amount: 1 },
            { type: 'Steypa', amount: 0.15 },
            { type: 'Gips', amount: 1 },
            { type: 'Varmamót', amount: 1 / (1.2 * 0.3) }]
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
            { type: 'Skrúfur í Cembritvegg', amount: 1 }]
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