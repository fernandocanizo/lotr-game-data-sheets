import type { FreshContext } from "$fresh/server.ts"
import type { Gear } from "../data/gear.ts"

import { Handlers, PageProps } from "$fresh/server.ts"

import { gear } from "../data/gear.ts"

type GearFilter = "all" | "spendable" | "preservable"

type Data = {
  filteredGear: Gear[]
  filter: GearFilter
}

export const handler: Handlers<Data> = {
  GET(req: Request, ctx: FreshContext) {
    const url = new URL(req.url)
    const filter = url.searchParams.get("gear")?.toLowerCase() ?? ""
    if (filter === "spendable") {
      const filteredGear = gear.filter(v => v.spendable)
      return ctx.render({ filteredGear, filter })
    } else if (filter === "preservable") {
      const filteredGear = gear.filter(v => !v.spendable)
      return ctx.render({ filteredGear, filter })
    }

    // else return all available gear
    return ctx.render({ filteredGear: gear, filter })
  },
}

export default function Gear({ data }: PageProps<Data>) {
  const { filteredGear, filter } = data
console.debug(filter)
  return (
    <div class="h-96 w-full overflow-scroll">
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

        <ul>
          {filteredGear.map(v => <li key={v.name}>{v.name}</li>)}
        </ul>

      </main>
    </div>
  )
}
