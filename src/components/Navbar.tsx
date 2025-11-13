"use client";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Navbar() {
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 border-b">
      <h1 className="text-xl font-semibold tracking-tight">SolDash</h1>
      <WalletMultiButton />
    </header>
  );
}
