import Link from "next/link";
import { typography } from "@/styles/design-tokens";

export default function Page() {
  return (
    <main className="bg-blue-100 min-h-screen p-4">
      <h1 className="font-black">briana's sketchbook</h1>
      <p>
        a collection of things i've made while at&nbsp;
        <a
          href="https://www.recurse.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={typography.inlineLink}
        >
          RC
        </a>
      </p>
      {/* <small>(not optimized for mobile)</small> */}
      <nav className="mt-10 flex flex-col gap-5">
        <Link href="/butt-or-face" className={typography.menuLink}>
          butt or face
          {/* <span className="bg-blue-500 h-5 w-5 rounded-full opacity-0 transition-all block group-hover:opacity-100 md:w-10 md:h-10"></span> */}
        </Link>
        <Link href="/marble-game" className={typography.menuLink}>
          marble game
        </Link>
        {/* <Link href="/breaker-breaker" className={typography.menuLink}>
          breaker breaker
        </Link> */}
        {/* <Link href="/breaker-breaker" className={typography.menuLink}>
          shaders, baby!
        </Link> */}
        {/* <Link href="/breaker-breaker" className={typography.menuLink}>
          <strike>bruno</strike> briana!
        </Link> */}
        <a
          className={typography.menuLink}
          href="https://recurse-recipes-app.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          recipes
        </a>
        <Link href="/how-many-marbles" className={typography.menuLink}>
          guessing game
        </Link>
        <Link href="/hangman" className={typography.menuLink}>
          hangman
        </Link>
      </nav>
    </main>
  );
}
