import Link from "next/link"

export default function Page() {
  return (
    <main className="bg-blue-100 min-h-screen text-black p-4">
      <h1 className="font-black">briana's sketchbook</h1>
      <p>a collection of things i've made while at&nbsp;<a href="https://www.recurse.com/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">RC</a></p>
      <small>(not optimized for mobile)</small>
      <nav className="mt-10 flex flex-col gap-4">
        <Link href="/butt-or-face" className="group flex items-center gap-4 text-blue-500 text-5xl md:text-9xl hover:underline md:gap-10">
          butt or face
          {/* <span className="bg-blue-500 h-5 w-5 rounded-full opacity-0 transition-all block group-hover:opacity-100 md:w-10 md:h-10"></span> */}
        </Link>
        <Link href="/marble-game" className="group flex items-center gap-4 text-blue-500 text-5xl md:text-9xl hover:underline md:gap-10">
          marble game
          {/* <span className="bg-blue-500 h-5 w-5 mt-4 rounded-full transition-all block group-hover:opacity-100 md:w-10 md:h-10"></span> */}
        </Link>
      </nav>
    </main>
  );
}