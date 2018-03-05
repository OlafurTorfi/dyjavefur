
export interface Material { type: string, price: number, unit: string, utility?: string }
export const materials: Material[] = [
    { type: 'Ál-listar', price: 2000, unit: 'm' },
    { type: 'Cembrit', price: 6000, unit: 'sqrm' },
    { type: 'Einangrun', price: 1000, unit: 'cubem', utility: 'floor' },
    { type: 'Gips', price: 2000, unit: 'sqrm' },
    { type: 'Gler', price: 14000, unit: 'sqrm' },
    { type: 'Gólfefni innanhúss-meðaltal', price: 5000, unit: 'sqrm', utility: 'floor' },
    { type: 'Leiðarar', price: 1000, unit: 'm' },
    { type: 'Múrklæðning', price: 5000, unit: 'sqrm' },
    { type: 'Skrúfur', price: 500, unit: 'sqrm' },
    { type: 'Steinull', price: 2000, unit: 'sqrm' },
    { type: 'Steypa', price: 25000, unit: 'cubem' },
    { type: 'Timbur', price: 4000, unit: 'sqrm' },
    { type: 'Tjöruolía', price: 500, unit: 'sqrm' },
    { type: 'Völun', price: 5000, unit: 'sqrm' }
]