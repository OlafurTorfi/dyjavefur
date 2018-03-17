import { MaterialAmount } from './materials'
export const floorChoices: { type: string, materials: MaterialAmount[] }[] = [
    {
        type: 'Generic 150mm',
        materials: [
            { type: 'Steypa', amount: 0.15 },
        ]
    },
    {
        type: 'Einangrun 100mm',
        materials: [
            { type: 'Einangrun', amount: 1 },
        ]
    },
    {
        type: 'Gólfefni 100mm',
        materials: [
            { type: 'Gólfefni innanhúss-meðaltal', amount: 1 },
        ]
    },
    {
        type: 'CLT Floor',
        materials: [
            { type: 'CLT', amount: 2 }
        ]
    }
]