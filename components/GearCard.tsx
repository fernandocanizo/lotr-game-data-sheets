import type { Gear } from "../data/gear.ts"

export default function GearCard({ gear }: { gear: Gear }) {
  const imgFolder = "/img/gear/"

  return (
    <div class="w-full min-w-[180px] max-w-xs rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5">
      <img src={`${imgFolder}${gear.img}`} alt={gear.name} class="w-[calc(100%-16px)] h-max rounded m-2" />
      <div class="w-full h-max rounded px-3.5 py-2.5">
        <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current my-1">{gear.name}</h6>
        <ul class="list-disc list-inside space-y-2 text-gray-700 ">
          {gear.cDamage === "0-0" ? null :
            <li><strong>Commander Damage:</strong>&nbsp; {gear.cDamage}</li>
          }
          {gear.cHp === 0 ? null :
            <li><strong>Commander HP:</strong>&nbsp; {gear.cHp}</li>
          }
          {gear.cCommand === 0 ? null :
            <li><strong>Commander Command:</strong>&nbsp; {gear.cCommand}</li>
          }
          {gear.cAttack === 0 ? null :
            <li><strong>Commander Attack:</strong>&nbsp; {gear.cAttack}</li>
          }
          {gear.cDefense === 0 ? null :
            <li><strong>Commander Defense:</strong>&nbsp; {gear.cDefense}</li>
          }
          {gear.cFocus === 0 ? null :
            <li><strong>Commander Focus:</strong>&nbsp; {gear.cFocus}</li>
          }
          {gear.cInitiative === 0 ? null :
            <li><strong>Commander Initiative:</strong>&nbsp; {gear.cInitiative}</li>
          }
          {gear.uAttack === 0 ? null :
            <li><strong>Unit Attack:</strong>&nbsp; {gear.uAttack}</li>
          }
          {gear.uDefense === 0 ? null :
            <li><strong>Unit Defense:</strong>&nbsp; {gear.uDefense}</li>
          }
          {!gear.uSiege || gear.uSiege === 0 ? null :
            <li><strong>Unit Siege:</strong>&nbsp; {gear.uSiege}%</li>
          }
        </ul>
        <h6 class="font-sans antialiased text-base md:text-lg lg:text-xl text-lime-500 my-1">Best for: {gear.bestFor}</h6>
      </div>
    </div>
  )
}
