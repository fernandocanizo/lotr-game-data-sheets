import type { FreshContext } from "$fresh/server.ts"
import type { Gear, GearColorTier } from "../data/gear.ts"

import { Handlers, PageProps } from "$fresh/server.ts"

import { gear } from "../data/gear.ts"
import GearCard from "../components/GearCard.tsx"

type GearFilter = "all" | "spendable" | "preservable"

type Data = {
  filteredGear: Gear[]
  filter: GearFilter
  tiers: GearColorTier[]
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
    let filteredGear = gear

    if (filter === "spendable") {
      filteredGear = gear.filter(v => v.spendable)
    } else if (filter === "preservable") {
      filteredGear = gear.filter(v => !v.spendable)
    }

    // else return all available gear filtered by tier
    filteredGear = filteredGear.filter(v => tiers.includes(v.tier))
    return ctx.render({ filteredGear, filter, tiers })
  },
}

export default function Gear({ data }: PageProps<Data>) {
  const { filteredGear, filter, tiers } = data

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

        <div class="mt-3 flex flex-wrap gap-4">
          {filteredGear.map(v => <GearCard gear={v} />)}
        </div>
      </main>
    </div>
  )
}
