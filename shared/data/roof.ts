import { MaterialAmount } from './materials'
import { materials } from "./materials";
export const roofChoices: { type: string, materials: MaterialAmount[] }[] = [
    {
        type: 'Generic - 400mm',
        materials: [
            { type: 'Timbur', amount: 1 },
            { type: 'Tjörupappi', amount: 1 },
            { type: 'Bárujárn', amount: 1 },
            { type: 'Skrúfur', amount: 1 }
        ]
    }
]