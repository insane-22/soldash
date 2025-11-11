"use client";
import Image from "next/image";
import dynamic from 'next/dynamic';

const ConnectWalletButton = dynamic(() => import('../components/ConnectWalletBtn'), {
  ssr: false,
});
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans ">
      <main className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold">Welcome to SolDash ;) </h1>
        {/* {!publicKey && <ConnectWalletButton />} */}
        <ConnectWalletButton />
        
        {publicKey && (
          <p className="mt-4 text-gray-700">
            Connected Wallet: {publicKey.toBase58()}
          </p>
        )}
      </main>
    </div>
  );
}
