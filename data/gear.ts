// TODO look out in-game names for gear types
export type GearType = "green" | "blue" | "purple" | "golden"

export type GearCapability = "nothing" | "troop attack" | "tank" | "physical damage dealer" | "focus damage dealer"

export type Gear = {
  type: GearType
  // TODO maybe I just need `bestFor` field, as "nothing" tells me it's spendable
  // but also, maybe `spendable` becomes a score. I'll know better when I
  // research the whole available set of equipment
  spendable: boolean
  bestFor: GearCapability
  name: string
  img: string
  cDamage: string
  cHp: number
  cCommand: number
  cAttack: number
  cDefense: number
  cFocus: number
  cInitiative: number
  uAttack: number
  uDefense: number
}

export const gear = [
  {
    type: "purple",
    spendable: false,
    bestFor: "physical damage dealer",
    name: "Battle Axe",
    img: "/img/default.png",
    cDamage: "5-7",
    cHp: 0,
    cCommand: 0,
    cAttack: 6,
    cDefense: 0,
    cFocus: 0,
    cInitiative: 0,
    uAttack: 0,
    uDefense: 2,
  },
  {
    type: "purple",
    spendable: true,
    bestFor: "nothing",
    name: "Uruk Crossbow",
    img: "/img/default.png",
    cDamage: "0-0",
    cHp: 0,
    cCommand: 55,
    cAttack: 0,
    cDefense: 0,
    cFocus: 3,
    cInitiative: 0,
    uAttack: 2,
    uDefense: 3,
  },
]

