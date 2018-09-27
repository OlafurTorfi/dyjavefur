import { MaterialAmount } from "./materials";
export const floorChoices: { type: string; materials: MaterialAmount[] }[] = [
  {
    type: "Generic 200mm",
    materials: [{ type: "Steypa", amount: 0.2 }]
  },
  {
    type: "Generic 150mm - Filled",
    materials: [{ type: "Steypa", amount: 0.15 }]
  },
  {
    type: "Concrete 200mm",
    materials: [{ type: "Steypa", amount: 0.2 }]
  },
  {
    type: "stair riser",
    materials: [{ type: "Steypa", amount: 0.16 }]
  },
  {
    type: "Einangrun 100mm",
    materials: [{ type: "Einangrun", amount: 1 }]
  },
  {
    type: "Flísar",
    materials: [{ type: "Gólfflísar", amount: 1 }]
  },
  {
    type: "Pallur",
    materials: [{ type: "Timbur", amount: 1 }]
  },
  {
    type: "Viðargólf",
    materials: [{ type: "Parket", amount: 1 }]
  },
  {
    type: "Viðarklæðning",
    materials: [{ type: "Parket", amount: 1 }]
  },
  {
    type: "Viðarþrep",
    materials: [{ type: "Parket", amount: 1 }, { type: "Timbur", amount: 1 }]
  },
  {
    type: "CLT Floor",
    materials: [{ type: "CLT", amount: 2 }]
  },
  {
    type: "Hiti í gólfi",
    materials: [
      { type: "Einangrun", amount: 1 },
      { type: "Plastpípa", amount: 10 }
    ]
  },
  {
    type: "Mæligólf",
    materials: []
  }
];
