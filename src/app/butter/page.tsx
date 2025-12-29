"use client";
import ButterStick from "@/components/ButterStick";
import Header from "@/components/Header";

export default function Page() {
  return (
    <main className="bg-blue-100">
      <Header/>
      <div className="fixed z-10 text-black top-0 left-0 w-full p-4">
        <p>just a floating stick of butter</p>
      </div>
      <ButterStick />
    </main>
  );
}
