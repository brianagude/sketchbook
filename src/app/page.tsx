import Link from "next/link";
import { links } from "@/data/links";
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
      <small>(you should probably explore on a laptop)</small>
      <nav className="mt-10 flex flex-col gap-5">
        {links
          .filter((link) => {
            if (link.hidden) {
              return process.env.NODE_ENV === 'development';
            }
            return true;
          })
          .map((link) => {
            const isOutbound = link.href.startsWith('http://') || link.href.startsWith('https://');
            const className = typography.menuLink
            
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
      </nav>
    </main>
  );
}
