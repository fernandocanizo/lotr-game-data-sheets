export default function Home() {
  return (
    <div class="h-96 w-full overflow-scroll">
      <nav class="rounded-lg border shadow-lg overflow-hidden p-2 bg-white border-stone-200 shadow-stone-950/5 sticky top-0 mx-auto w-full max-w-screen-xl">
        <div class="flex items-center">
          <a href="/" class="font-sans antialiased text-sm text-current ml-2 mr-2 block py-1 font-semibold">LOTR Data Sheets</a>
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

      <main class="w-full">
        <p>Nothing here yet...</p>
      </main>
    </div>
  )
}
