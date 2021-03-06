import { QueryResult } from "pg";

export interface Material {
  type: string;
  price: number;
  unit?: string;
  utility?: string;
  lambda?: number;
}

export interface MaterialAmount {
  type: string;
  amount: number;
}

export interface MaterialType extends AreaType {
  materials: MaterialAmount[];
  resistance: number;
  isolation: number;
}
export interface LevelType extends MaterialType {
  level: string;
}
export interface AreaType extends BaseType {
  area: number;
}
export interface BaseType {
  family: string;
  type: string;
  price: number;
}

export const materials: Material[] = [
  { type: "Ál-listar", price: 6000, unit: "m" },
  { type: "Cembrit", price: 6000, unit: "sqrm" },
  {
    type: "Einangrun",
    price: 4000,
    unit: "sqrm",
    utility: "floor",
    lambda: 0.034
  },
  { type: "Gips", price: 2000, unit: "sqrm" },
  { type: "Gler", price: 14000, unit: "sqrm", lambda: 1.5 },
  { type: "Parket", price: 5000, unit: "sqrm", utility: "floor" },
  { type: "Gólfflísar", price: 10000, unit: "sqrm", utility: "floor" },
  { type: "Leiðarar", price: 1000, unit: "m" },
  { type: "Plastpípa", price: 300, unit: "m" },
  { type: "Múrklæðning", price: 5000, unit: "sqrm" },
  { type: "Skrúfur í Cembritvegg", price: 1500, unit: "sqrm" },
  { type: "Skrúfur", price: 1500, unit: "sqrm" },
  { type: "Steinull", price: 1000, unit: "cubem", lambda: 0.034 },
  { type: "Steypa", price: 25000, unit: "cubem", lambda: 1.6 },
  { type: "Timbur", price: 4000, unit: "sqrm" },
  { type: "Tjöruolía", price: 500, unit: "sqrm" },
  { type: "Þrifalag", price: 500, unit: "sqrm" },
  { type: "Völun", price: 5000, unit: "sqrm" },
  { type: "Tjörupappi", price: 2000, unit: "sqrm" },
  { type: "Bárujárn", price: 5000, unit: "sqrm" },
  { type: "Krossviður", price: 2500, unit: "sqrm" },
  { type: "Varmamót", price: 7900, unit: "sqrm" },
  { type: "Lerkipanell", price: 7900, unit: "sqrm" },
  { type: "Vinklar, skrúfur og lekta", price: 7900, unit: "sqrm" },
  { type: "CLT", price: 20000, unit: "cubem", lambda: 0.12 },
  { type: "Þaksvalaklæðning", price: 5000, unit: "sqrm" },
  { type: "Triple S undirkerfi", price: 1500, unit: "sqrm" },
  { type: "Álklæðning", price: 4000, unit: "fermeter", lambda: 0.034 },
  { type: "Sto Venturi", price: 80000, unit: "cubem", lambda: 0.034 },
  { type: "Sto Venturi Brick", price: 130000, unit: "cubem", lambda: 0.034 },
  { type: "Timburveggur", price: 12000, unit: "sqrm", lambda: 0.034 }
];
