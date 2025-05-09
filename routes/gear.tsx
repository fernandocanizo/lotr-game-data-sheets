import type { FreshContext } from "$fresh/server.ts"
import type { Gear, GearColorTier, GearType, GearCapability, GearSortableFields } from "../data/gear.ts"

import { Handlers, PageProps } from "$fresh/server.ts"

import { gear } from "../data/gear.ts"
import GearCard from "../components/GearCard.tsx"

type GearFilter = "all" | "spendable" | "preservable"

type Data = {
  filteredGear: Gear[]
  filter: GearFilter
  tiers: GearColorTier[]
  types: GearType[]
  capabilities: GearCapability[]
  sortBy: "none" | GearSortableFields
}

export const handler: Handlers<Data> = {
  GET(req: Request, ctx: FreshContext) {
    const url = new URL(req.url)
    const filter = url.searchParams.get("gear")?.toLowerCase() ?? ""

    const goldenTier = url.searchParams.get("tier-golden")?.toLowerCase() ?? ""
    const purpleTier = url.searchParams.get("tier-purple")?.toLowerCase() ?? ""
    const blueTier = url.searchParams.get("tier-blue")?.toLowerCase() ?? ""
    const greenTier = url.searchParams.get("tier-green")?.toLowerCase() ?? ""
    const tiers = [goldenTier, purpleTier, blueTier, greenTier].filter(v => v)

    const weaponType = url.searchParams.get("type-weapon")?.toLowerCase() ?? ""
    const helmetType = url.searchParams.get("type-helmet")?.toLowerCase() ?? ""
    const armorType = url.searchParams.get("type-armor")?.toLowerCase() ?? ""
    const accessoryType = url.searchParams.get("type-accessory")?.toLowerCase() ?? ""
    const types = [weaponType, helmetType, armorType, accessoryType].filter(v => v)

    const capTroopAttack = url.searchParams.get("capability-troop-attack")?.toLowerCase() ?? ""
    const capTank = url.searchParams.get("capability-tank")?.toLowerCase() ?? ""
    const capPhysical = url.searchParams.get("capability-physical")?.toLowerCase() ?? ""
    const capFocus = url.searchParams.get("capability-focus")?.toLowerCase() ?? ""
    const capabilities = [capTroopAttack, capTank, capPhysical, capFocus].filter(v => v)

    const sortBy = url.searchParams.get("sort-by") ?? ""

    let filteredGear = gear

    if (filter === "spendable") {
      filteredGear = gear.filter(v => v.spendable)
    } else if (filter === "preservable") {
      filteredGear = gear.filter(v => !v.spendable)
    }

    // else return all available gear filtered by tier, and/or type and/or capability
    filteredGear = tiers.length ? filteredGear.filter(v => tiers.includes(v.tier)) : filteredGear
    filteredGear = types.length ? filteredGear.filter(v => types.includes(v.type)) : filteredGear
    filteredGear = capabilities.length ? filteredGear.filter(v => capabilities.includes(v.bestFor)) : filteredGear

    if (sortBy && sortBy !== "none") {
      filteredGear.sort((a, b) => {
        return b[sortBy as GearSortableFields] - a[sortBy as GearSortableFields]
      })
    }

    return ctx.render({ filteredGear, filter, tiers, types, capabilities, sortBy })
  },
}

export default function Gear({ data }: PageProps<Data>) {
  const { filteredGear, filter, tiers, types, capabilities, sortBy } = data

  return (
    <div class="w-full">
      <nav class="rounded-lg border shadow-lg overflow-hidden p-2 bg-white border-stone-200 shadow-stone-950/5 sticky top-0 mx-auto w-full max-w-screen-xl">
        <div class="flex items-center">
          <a href="#" class="font-sans antialiased text-sm text-current ml-2 mr-2 block py-1 font-semibold">LOTR Data Sheets</a>
          <hr class="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
          <div class="hidden lg:block">
            <ul class="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
              <li>
                <a href="/gear" class="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary">Gear</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="w-full p-6">
        <form method="get">
          <fieldset class="border border-gray-200 rounded-md p-4">
            <legend class="text-lg font-semibold text-gray-700 mb-2">Select tier</legend>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="tier-golden"
                  value="golden"
                  checked={tiers.includes("golden")}
                  class="w-5 h-5 accent-yellow-300 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Flawless (golden)</span>
              </label>

              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="tier-purple"
                  value="purple"
                  checked={tiers.includes("purple")}
                  class="w-5 h-5 accent-purple-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Exquisite (purple)</span>
              </label>

              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="tier-blue"
                  value="blue"
                  checked={tiers.includes("blue")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Fine (blue)</span>
              </label>

              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="tier-green"
                  value="green"
                  checked={tiers.includes("green")}
                  class="w-5 h-5 accent-lime-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Superior (green)</span>
              </label>
          </fieldset>

          <fieldset class="border border-gray-200 rounded-md p-4">
            <legend class="text-lg font-semibold text-gray-700 mb-2">Select gear type</legend>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="type-weapon"
                  value="weapon"
                  checked={types.includes("weapon")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Weapon</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="type-helmet"
                  value="helmet"
                  checked={types.includes("helmet")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Helmet</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="type-armor"
                  value="armor"
                  checked={types.includes("armor")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Armor</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="type-accessory"
                  value="accessory"
                  checked={types.includes("accessory")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Accessory</span>
              </label>
          </fieldset>

          <fieldset class="border border-gray-200 rounded-md p-4">
            <legend class="text-lg font-semibold text-gray-700 mb-2">Select by gear capability</legend>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="capability-troop-attack"
                  value="troop attack"
                  checked={capabilities.includes("troop attack")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Troop Attack</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="capability-tank"
                  value="tank"
                  checked={capabilities.includes("tank")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Tank (Troop Defense)</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="capability-physical"
                  value="physical commander"
                  checked={capabilities.includes("physical commander")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Physical Commander (typical "Damage Dealer")</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2 mr-2">
                <input
                  type="checkbox"
                  name="capability-focus"
                  value="focus commander"
                  checked={capabilities.includes("focus commander")}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Focus Commander</span>
              </label>
          </fieldset>

          <fieldset class="border border-gray-200 rounded-md p-4">
            <legend class="text-lg font-semibold text-gray-700 mb-2">Sort by</legend>
            <label class="block text-sm font-medium text-stone-700 mb-1">Choose an option to sort by:</label>
            <select name="sort-by"
              class="block rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-900 shadow-sm shadow-stone-950/5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition disabled:opacity-50 disabled:pointer-events-none"
            >
              <option value="none" selected={sortBy === "none"}>None</option>
              <option value="cHp" selected={sortBy === "cHp"}>Commander HP</option>
              <option value="cCommand" selected={sortBy === "cCommand"}>Commander Command</option>
              <option value="cAttack" selected={sortBy === "cAttack"}>Commander Attack</option>
              <option value="cDefense" selected={sortBy === "cDefense"}>Commander Defense</option>
              <option value="cFocus" selected={sortBy === "cFocus"}>Commander Focus</option>
              <option value="cInitiative" selected={sortBy === "cInitiative"}>Commander Initiative</option>
              <option value="uAttack" selected={sortBy === "uAttack"}>Unit Attack</option>
              <option value="uDefense" selected={sortBy === "uDefense"}>Unit Defense</option>
            </select>
          </fieldset>

          <fieldset class="border border-gray-200 rounded-md p-4">
            <legend class="text-lg font-semibold text-gray-700 mb-2">Select which gear to show</legend>
            <div class="flex flex-col gap-3">
              <label class="inline-flex items-center cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gear"
                  value="all"
                  checked={filter === "all"}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">All</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gear"
                  value="spendable"
                  checked={filter === "spendable"}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Spendable</span>
              </label>
              <label class="inline-flex items-center cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gear"
                  value="preservable"
                  checked={filter === "preservable"}
                  class="w-5 h-5 accent-blue-600 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span class="text-gray-900 font-medium">Preservable</span>
              </label>

              <button
                type="submit"
                class="ml-auto bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Filter
              </button>
            </div>
          </fieldset>
        </form>

        <h1 class="font-sans antialiased font-bold text-base md:text-xl lg:text-2xl text-current text-center my-1">Total filtered gear: <strong>{filteredGear.length}</strong></h1>

        <div class="mt-3 flex flex-wrap gap-4">
          {filteredGear.map(v => <GearCard gear={v} />)}
        </div>
      </main>
    </div>
  )
}
