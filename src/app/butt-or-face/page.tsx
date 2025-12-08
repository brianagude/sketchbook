"use client";
import Link from "next/link";
import ButterStick from "@/components/ButterStick";

export default function Page() {
  return (
    <main className="bg-blue-100">
      <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>
          phonetically inspired by a{" "}
          <a
            href="https://www.amazon.com/Butt-Face-Kari-Lavelle/dp/1728271177"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            children's book
          </a>
        </p>
      </div>
      <ButterStick />
      <Link
        href="/"
        className="fixed z-10 bottom-4 right-4 underline text-black hover:font-black"
      >
        Home
      </Link>
    </main>
  );
}
