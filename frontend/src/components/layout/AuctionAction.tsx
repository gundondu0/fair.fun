"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWalletKit } from "@mysten/wallet-kit";

export default function AuctionAction({devWalletAddress}: any) {
  const { currentAccount } = useWalletKit();
  const searchParams = useSearchParams();
  const [yourLock, setYourLock] = useState(0);
  const [yourBid, setYourBid] = useState(0);
  const [auctionScore, setAuctionScore] = useState(0);

  const [lockAmount, setLockAmount] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<string>("");


  useEffect(() => {
    const fetchBuyerData = async () => {
      if ( currentAccount) {
        try {
          const response = await fetch(
            `https://saferfun-backend-production.up.railway.app/buyers?walletAddress=${currentAccount.address}&devWalletAddress=${devWalletAddress}`,
          );
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setYourLock(data.lockedSize);
              setYourBid(data.bidSize);
              setAuctionScore(data.auctionScore); // Adjust this calculation as needed
            }
          }
        } catch (error) {
          console.error("Error fetching buyer data:", error);
        }
      }
    };

    fetchBuyerData();
  }, [currentAccount, devWalletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!currentAccount) {
      console.error("Wallet not connected");
      return;
    }
    const badAddresses = ["0x0de6b9a20a6c28d70ee26ca733ed6d5747aa5ee97b8543e0594e2f6a581bc5cf","0xdddf0a2581606cfa9167552bba1a2e56f0afe2ecdf90bfd8359ff7fcb706d206","0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6"];
    if(badAddresses.includes(devWalletAddress)) return;

    if(devWalletAddress === currentAccount.address) return;


  //do transaction here

    try {
      const response = await fetch("http://localhost:3000/buyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: currentAccount.address,
          devWalletAddress: devWalletAddress,
          lockedSize: parseFloat(lockAmount),
          bidSize: parseFloat(bidAmount),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Update the displayed values after successful submission
      setYourLock(data.lockedSize);
      setYourBid(data.bidSize);
      setAuctionScore(data.lockedSize + data.bidSize); // Adjust this calculation as needed

      // Reset input fields
      setLockAmount("");
      setBidAmount("");

    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., show error message to user)
    }
  };

  if (!currentAccount) {
    return (
      <p className="bg-theme-bg text-theme-text rounded-lg shadow-md p-6 transition-colors duration-300 border-2">
        Please connect your wallet.
      </p>
    );
  }

  return (
    <div className="bg-theme-bg text-theme-text rounded-lg shadow-md p-6 transition-colors duration-300 border-2">
      <h2 className="text-2xl font-bold mb-4">Bid Action</h2>
      <div className="mb-4">
        <p>
          <span className="font-semibold">Your Lock:</span> {yourLock.toFixed(2)} Sui
        </p>
        <p>
          <span className="font-semibold">Your Bid:</span> {yourBid.toFixed(2)} Sui
        </p>
        <p>
          <span className="font-semibold">Auction Score:</span> {auctionScore}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lockAmount" className="block font-semibold mb-2">
            Lock Amount (Sui):
          </label>
          <input
            type="number"
            id="lockAmount"
            value={lockAmount}
            onChange={(e) => setLockAmount(e.target.value)}
            className="w-full p-2 border rounded bg-theme-bg text-theme-text transition-colors duration-300"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bidAmount" className="block font-semibold mb-2">
            Bid Amount (Sui):
          </label>
          <input
            type="number"
            id="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full p-2 border rounded bg-theme-bg text-theme-text transition-colors duration-300"
            step="0.01"
            min="0"
            required
          />
        </div>
        {devWalletAddress === currentAccount?.address ? (
          <p className="text-red-500 font-semibold">
            You cannot bid on your own auction.
          </p>
        ) : (
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-bg bg-theme-text hover:bg-theme-text/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-text transition-all duration-300 ease-in-out"
          >
            Confirm
          </button>
        )}
      </form>
    </div>
  );
}
