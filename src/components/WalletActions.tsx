"use client";

import { Button } from "@/components/ui/button";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import SendSolDialog from "./SendSolDialog";

export default function WalletActions({
  refreshBalance,
}: {
  refreshBalance: () => void;
}) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  if (!publicKey) return null;

  const requestAirdrop = async () => {
    if (!publicKey) return;
    try {
      const sig = await connection.requestAirdrop(
        publicKey,
        1 * LAMPORTS_PER_SOL
      );
      const latest = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          signature: sig,
          blockhash: latest.blockhash,
          lastValidBlockHeight: latest.lastValidBlockHeight,
        },
        "confirmed"
      );

      toast(" Airdrop Successful", { description: "1 SOL added." });
      refreshBalance();
    } catch (err: any) {
      toast.warning(" Airdrop Failed", { description: err.message });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-6">
      <Button onClick={requestAirdrop}>Airdrop</Button>
      <SendSolDialog refreshBalance={refreshBalance} />
    </div>
  );
}
