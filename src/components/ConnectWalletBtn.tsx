"use client";

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ConnectWalletButton() {
  return (
    <div className="flex justify-center py-6">
      <WalletMultiButton className="btn btn-primary" />
    </div>
  );
}
