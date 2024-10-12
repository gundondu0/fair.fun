"use client";
import CoinListLayout from "../components/layout/CoinList";
import InfoComponent from "../components/layout/InfoComponent";
import TopCoinBanner from "../components/layout/TopCoinBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-notebook-squares bg-background">
      <main className="flex h-full flex-col p-4 gap-12">
        <InfoComponent />
        <TopCoinBanner />
        <CoinListLayout />
      </main>
    </div>
  );
}
