"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Card } from "@/components/ui/card";

export default function WalletInfo({ balance }: { balance: number | null }) {
  const { publicKey } = useWallet();

  if (!publicKey)
    return (
      <>
      <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to SolDash!</h1>
        <p className="text-center text-muted-foreground">
          Connect wallet to view details
        </p>
      </>
    );

  return (
    <Card className="p-4 mt-6 space-y-2">
      <p className="text-sm font-medium">Address</p>
      <p className="font-mono text-xs">{publicKey.toBase58()}</p>

      <div className="flex items-center justify-between pt-2">
        <p className="text-sm font-medium">Balance (Devnet) </p>
        <p className="font-semibold">{balance?.toFixed(3) ?? "--"} SOL</p>
      </div>
    </Card>
  );
}
