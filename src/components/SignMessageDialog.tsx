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
import { useWallet } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import bs58 from "bs58";

export default function SignMessageDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { publicKey, signMessage } = useWallet();

  const handleSign = async () => {
    if (!publicKey || !signMessage) {
      toast.warning("Wallet does not support message signing.");
      return;
    }

    try {
      const encoded = new TextEncoder().encode(message);

      const signature = await signMessage(encoded);
      const signatureBase58 = bs58.encode(signature);

      const isValid = nacl.sign.detached.verify(
        encoded,
        signature,
        publicKey.toBytes()
      );

      toast(isValid ? "Message Signed & Verified" : "Signature Invalid", {
        description: isValid
          ? `Signature: ${signatureBase58}`
          : "Could not verify the signature",
      });

      setOpen(false);
      setMessage("");
    } catch (err: any) {
      toast.error("Failed to sign message", {
        description: err.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sign Message</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Message</DialogTitle>
          <DialogDescription>
            Enter a message to sign with your wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 space-y-3">
          <Input
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSign} disabled={!message}>
            Sign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
