"use client"
import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

export function SuiProvider({children}:any) {
    return <WalletProvider>
    {children}
    </WalletProvider>
  
}