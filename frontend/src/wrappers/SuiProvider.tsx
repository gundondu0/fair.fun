"use client"
import { WalletKitProvider } from '@mysten/wallet-kit';

export function SuiProvider({children}:any) {
    return <WalletKitProvider>{children}</WalletKitProvider>;
}