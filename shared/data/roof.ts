import { MaterialAmount } from "./materials";
import { materials } from "./materials";
export const roofChoices: {
  type: string;
  materials: MaterialAmount[];
  areaOverride?: number;
}[] = [
  {
    type: "Generic - 399mm",
    materials: [
      { type: "Timbur", amount: 1 },
      { type: "Tjörupappi", amount: 1 },
      { type: "Bárujárn", amount: 1 },
      { type: "Skrúfur", amount: 1 }
    ]
  },
  {
    type: "Roof 1",
    materials: [
      { type: "Steypa", amount: 0.3 },
      { type: "Tjörupappi", amount: 2 }
    ]
  },
  {
    type: "Cold Roof - Concrete",
    materials: [{ type: "Steypa", amount: 0.1 }]
  },
  {
    type: "Sloped Glazing",
    materials: [{ type: "Gler", amount: 1 }, { type: "Ál-listar", amount: 6 }],
    areaOverride: 17
  }
];
