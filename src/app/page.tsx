"use client";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import WalletInfo from "@/components/WalletInfo";
import WalletActions from "@/components/WalletActions";
import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState<number | null>(null);

  const refreshBalance = async () => {
    if (!publicKey) return;
    const lamports = await connection.getBalance(publicKey);
    setBalance(lamports / LAMPORTS_PER_SOL);
  };

  // Fetch balance whenever wallet changes
  useEffect(() => {
    refreshBalance();
  }, [publicKey]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-md mx-auto py-4 my-auto px-4">
        <WalletInfo balance={balance} />
        <WalletActions refreshBalance={refreshBalance} />
      </div>
      <Toaster />
    </main>
  );
}
