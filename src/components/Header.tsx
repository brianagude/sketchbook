"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { typography } from "@/styles/design-tokens";

const links = [
  { href: '/', label: 'home' },
  { href: '/butter', label: 'butter' },
  { href: '/marble-game', label: 'planet race' },
  { href: '/how-many-marbles', label: 'marbles' },
  { href: '/hangman', label: 'hangman' },
  { href: '/brain-dump', label: 'playground' },
]

export default function Header({ mode = "light" }) {
  const pathname = usePathname();
  
  return (
    <header className="fixed bottom-0 left-0 w-full p-2 z-50">
      <div
        className={`flex justify-between w-full py-2 px-6 rounded-lg ${mode === "dark" ? "liquid-glass-dark" : "liquid-glass"}`}
      >
        <h1 className="font-black">briana's sketchbook</h1>
        <nav className="flex gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  ${typography.headerLink}
                  hover:border-b-2 hover:border-black-500 hover:font-semibold
                  ${isActive ? 'border-b-2 border-black-500 font-semibold transition-all' : ''}
                `}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            className={`
              ${typography.headerLink}
              hover:border-b-2 hover:border-black-500 hover:font-semibold
            `}
            href="https://recurse-recipes-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            recipes
          </a>
        </nav>
      </div>
    </header>
  );
}
