"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";
import { typography } from "@/styles/design-tokens";

export default function Header({ mode = "light" }) {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 left-0 w-full p-2 z-50">
      <div
        className={`flex flex-col w-full py-2 px-6 gap-3 rounded-lg shadow-md lg:flex-row lg:justify-between ${mode === "dark" ? "liquid-glass-dark" : "liquid-glass"}`}
      >
        <Link className="font-black" href='/'>briana's sketchbook</Link>
        <nav className="flex gap-x-4 gap-y-1 flex-wrap">
          {links
            .filter((link) => {
              if (link.hidden) {
                return process.env.NODE_ENV === 'development';
              }
              return true;
            })
            .map((link) => {
              const isActive = pathname === link.href;
              const isOutbound = link.href.startsWith('http://') || link.href.startsWith('https://');
              const className = `
                ${typography.headerLink}
                hover:border-b-2 hover:border-black-500 hover:font-semibold
                ${isActive ? "border-b-2 border-black-500 font-semibold transition-all" : ""}
              `;
              
              if (isOutbound) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={className}
                >
                  {link.label}
                </Link>
              );
            })}
          {/* {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  ${typography.headerLink}
                  hover:border-b-2 hover:border-black-500 hover:font-semibold
                  ${isActive ? "border-b-2 border-black-500 font-semibold transition-all" : ""}
                `}
              >
                {link.label}
              </Link>
            );
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
          </a> */}
        </nav>
      </div>
    </header>
  );
}
