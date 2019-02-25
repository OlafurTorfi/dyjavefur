import { MaterialAmount } from "./materials";
export const wallChoices: {
  type: string;
  materials: MaterialAmount[];
  purpose: string;
}[] = [
  {
    type: "CLT-15/15 - Sto Venturi klæðning - Yellow",
    materials: [
      { amount: 0.15, type: "CLT" },
      { amount: 0.1, type: "Sto Venturi" }
    ],
    purpose: "Útveggur"
  },
  {
    type: "CLT-15/15 - Sto Venturi klæðning - Blue, Sky",
    materials: [
      { amount: 0.15, type: "CLT" },
      { amount: 0.1, type: "Sto Venturi" }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Steypt m. Báru 15/15 White",
    materials: [
      { amount: 0.15, type: "Steypa" },
      { amount: 1, type: "Einangrun" },
      { amount: 1, type: "Triple S undirkerfi" },
      { amount: 1, type: "Álklæðning" }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Steypt m. Báru 20/15 White",
    materials: [
      { amount: 0.15, type: "Steypa" },
      { amount: 1, type: "Álklæðning" },
      { amount: 1, type: "Triple S undirkerfi" },
      { amount: 1, type: "Álklæðning" }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Sökkull 200mm",
    materials: [{ amount: 0.2, type: "Steypa" }],
    purpose: "Sökkull"
  },
  {
    type: "Sökkull 150mm",
    materials: [{ amount: 0.15, type: "Steypa" }],
    purpose: "Sökkull"
  },
  {
    type: "CLT150mm",
    materials: [
      {
        type: "CLT",
        amount: 1
      }
    ],
    purpose: "Innveggur"
  },
  {
    type: "CLT100mm",
    materials: [
      {
        type: "CLT",
        amount: 1
      }
    ],
    purpose: "Innveggur"
  },
  {
    type: "Timbur - Grindarefni",
    materials: [
      {
        type: "Timburveggur",
        amount: 1
      }
    ],
    purpose: "Innveggur"
  },
  {
    type: "CLT100mm 2",
    materials: [
      {
        type: "CLT",
        amount: 1
      }
    ],
    purpose: "Innveggur"
  },
  {
    type: "Interior - gipsklætt timbur/stálull",
    materials: [
      {
        type: "Gips",
        amount: 2
      },
      {
        type: "Timbur",
        amount: 1
      }
    ],
    purpose: "Innveggur"
  },
  {
    type: "Generic - 100mm",
    materials: [{ type: "Steypa", amount: 0.1 }],
    purpose: "Innveggur"
  },
  {
    type: "Generic - 150mm",
    materials: [{ type: "Steypa", amount: 0.15 }],
    purpose: "Innveggur"
  },
  {
    type: "Generic - 150mm yellow",
    materials: [{ type: "Steypa", amount: 0.15 }],
    purpose: "Handrið"
  },
  {
    type: "Generic - 250mm yellow",
    materials: [{ type: "Steypa", amount: 0.25 }],
    purpose: "Handrið"
  },
  {
    type: "Timburklæðning",
    materials: [{ type: "Timbur", amount: 1 }],
    purpose: "Útveggur"
  },
  {
    type: "CembritKlæðning",
    materials: [{ type: "Cembrit", amount: 1 }],
    purpose: "Útveggur"
  },
  {
    type: "Generic - 200mm",
    materials: [{ type: "Steypa", amount: 0.2 }],
    purpose: "Innveggur"
  },
  {
    type: "Generic - 250mm",
    materials: [{ type: "Steypa", amount: 0.25 }],
    purpose: "Innveggur"
  },
  {
    type: "Krossviður",
    materials: [{ type: "Krossviður", amount: 1 }],
    purpose: "Innveggur"
  },
  {
    type: "Timbur-15/15 - Viðarklætt",
    materials: [
      { type: "Timburveggur", amount: 1 },
      { type: "Lerkipanell", amount: 1 },
      { type: "Vinklar, skrúfur og lekta", amount: 1 },
      { type: "Einangrun", amount: 1 }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Timbur-15/15 m. báru",
    materials: [
      { type: "Timburveggur", amount: 1 },
      { type: "Álklæðning", amount: 1 },
      { type: "Vinklar, skrúfur og lekta", amount: 1 },
      { type: "Einangrun", amount: 1 }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Timbur 15/15 Viðarklætt",
    materials: [
      { type: "Timburveggur", amount: 1 },
      { type: "Lerkipanell", amount: 1 },
      { type: "Vinklar, skrúfur og lekta", amount: 1 },
      { type: "Einangrun", amount: 1 }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Steypt m. timbri 20/15",
    materials: [
      { type: "Timbur", amount: 1 },
      { type: "Steinull", amount: 0.1 },
      { type: "Steypa", amount: 0.2 },
      { type: "Gips", amount: 1 }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Steypt m. timbri 15/15",
    materials: [
      { type: "Timbur", amount: 1 },
      { type: "Steinull", amount: 0.1 },
      { type: "Steypa", amount: 0.15 }
    ],
    purpose: "Útveggur"
  },
  {
    type: "Einangrun",
    materials: [{ type: "Steinull", amount: 0.1 }],
    purpose: "Einangrun"
  },
  {
    type: "CLT 90 - VQ 4/3",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 4/2",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 4/4",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 3/4",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 2/2",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 1/1",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 1/4",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 2/3",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "CLT 90 - VQ 1/2",
    materials: [{ amount: 0.09, type: "CLT" }],
    purpose: "Any"
  },
  {
    type: "Concrete 100",
    materials: [{ amount: 0.1, type: "Steypa" }],
    purpose: "Any"
  },
  {
    type: "Concrete 150",
    materials: [{ amount: 0.15, type: "Steypa" }],
    purpose: "Any"
  },
  {
    type: "Concrete 150 sjónsteypa",
    materials: [{ amount: 0.15, type: "Steypa" }],
    purpose: "Any"
  },
  {
    type: "Concrete 100 sjónsteypa",
    materials: [{ amount: 0.1, type: "Steypa" }],
    purpose: "Any"
  },
  {
    type: "Concrete 200",
    materials: [{ amount: 0.2, type: "Steypa" }],
    purpose: "Any"
  },
  {
    type: "Gluggi",
    materials: [{ type: "Gler", amount: 1 }, { type: "Ál-listar", amount: 6 }],
    purpose: "Útveggur"
  }
];
