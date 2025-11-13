"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export default function SendSolDialog({ refreshBalance }: { refreshBalance: () => void }) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSend = async () => {
    if (!publicKey || !recipient || !amount) return;

    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const sig = await sendTransaction(tx, connection);
      toast("Transaction Sent", { description: `Signature: ${sig}` });
      refreshBalance();
      setOpen(false);
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      toast.warning("Transaction failed", { description: err.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Send SOL</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send SOL</DialogTitle>
          <DialogDescription>
            Enter the recipient address and amount to transfer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Input
            placeholder="Recipient public key"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Input
            placeholder="Amount (SOL)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            step="0.001"
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSend} disabled={!recipient || !amount}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
