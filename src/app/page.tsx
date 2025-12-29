import Link from "next/link";
import { typography } from "@/styles/design-tokens";

const links = [
  { href: '/butter', label: 'butter' },
  { href: '/marble-game', label: 'planet race' },
  { href: '/how-many-marbles', label: 'marbles' },
  { href: '/hangman', label: 'hangman' },
  { href: '/brain-dump', label: 'playground' },
]

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
      <small>(you should probably explore on a laptop)</small>
      <nav className="mt-10 flex flex-col gap-5">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={typography.menuLink}
            >
              {link.label}
              {/* <span className="bg-blue-500 h-5 w-5 rounded-full opacity-0 transition-all block group-hover:opacity-100 md:w-10 md:h-10"></span> */}
            </Link>
          )
        })}
        <a
          className={typography.menuLink}
          href="https://recurse-recipes-app.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          recipes
        </a>
      </nav>
    </main>
  );
}
