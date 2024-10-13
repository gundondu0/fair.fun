"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import AuctionDetails from "../../components/layout/AuctionDetails";
import AuctionAction from "../../components/layout/AuctionAction";
import TokenAllocation from "@/src/components/layout/TokenAllocation";
import CommentSection from "@/src/components/layout/CommentSection";
import TokenDetails from "@/src/components/layout/TokenDetails";
import unicornSolami from "@/src/public/image/unicornSolami.jpeg";
import escapeMatrix from "@/src/public/image/escapeMatrix.png";
import sashaWifHat from "@/src/public/image/sashaWifHat.jpeg";
import twoFaceDog from "@/src/public/image/twoFaceDog.jpeg";
import onFire from "@/src/public/image/onFire.jpeg";
import { StaticImageData } from "next/image";

type Token = {
  name: string;
  creator: string;
  endsIn: Date;
  totalLockedValue: string;
  totalBids: number;
  description: string;
  symbol: string;
  users: {
    walletAddress: string;
    reservedToken: number;
    lockedSize: number;
    bidSize: number;
    auctionScore: number;
  }[];
  lockedAmount?: number;
  auctionPoint?: number;
  dateCreated?: string;
  auctionPointDetails?: string;
  image: StaticImageData;
};

// Extended mock data
const tokens: { [key: number]: Token } = {
  1: {
    name: "Satoshi Pawsamoto",
    creator: "0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6",
    endsIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    totalLockedValue: "1000 Sui",
    totalBids: 86,
    symbol: "$CAT",
    description: "In the crypto jungle, one cat reigns supreme Satoshi Pawsamoto.",
    users: [
      {
        walletAddress: "0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6",
        reservedToken: 1000,
        lockedSize: 500,
        bidSize: 0,
        auctionScore: 0,
      },
      {
        walletAddress: "0xc5d612153c3c01dfcd001fdbeb0b34eba50740f398f167e5a1934acb37df49e3",
        reservedToken: 800,
        lockedSize: 300,
        bidSize: 50,
        auctionScore: 90,

      },
      {
        walletAddress: "0x2d2c526b395a0f1b1a233d527d5a4438aababe73a003381e421367617b540c95",
        reservedToken: 100,
        lockedSize: 50,
        bidSize: 20,
        auctionScore: 80,

      },
      {
        walletAddress: "0x9322337d75f9f9acbd4d4f95bf3074b91d1bcdf0381bffd08d5e51040c600ff4",
        reservedToken: 90,
        lockedSize: 45,
        bidSize: 10,
        auctionScore: 60,

      },
      {
        walletAddress: "0x5c3035a0c29317cffcb75a1ec2b780b834ebbf49c8e55b1c70d0008e10357ad4",
        reservedToken: 100,
        lockedSize: 100,
        bidSize: 5,
        auctionScore: 55,

      },
      {
        walletAddress: "0x180e6d341c7762a2c3573bbf07b2a6ee89f1b41cc22eb50848b65bf64c99b9d3",
        reservedToken: 1,
        lockedSize: 5,
        bidSize: 1,
        auctionScore: 5,
      },
    ],
    image: onFire,
  },
  2: {
    name: "Unicorn Solami Donut Cat",
    symbol: "$USD",
    creator: "0x0de6b9a20a6c28d70ee26ca733ed6d5747aa5ee97b8543e0594e2f6a581bc5cf",
    endsIn: new Date(Date.now() + 5*24 * 60 * 60 * 1000),
    totalLockedValue: "10 Sui",
    totalBids: 1,
    description: "mmm food...",
    users: [
      {
        walletAddress: "0x0de6b9a20a6c28d70ee26ca733ed6d5747aa5ee97b8543e0594e2f6a581bc5cf",
        reservedToken: 120,
        lockedSize: 7,
        bidSize: 900,
        auctionScore: 113,
      },
      {
        walletAddress: "0x0c2abeb84245685116b35a92e10dd2c078126a91218bd496f09abe951be4ad95",
        reservedToken: 10,
        lockedSize: 4,
        bidSize: 0.5,
        auctionScore: 90,
      },
      {
        walletAddress: "0x77c598179d02ad1f1312ab63d97a0d721822463c66d577785bea451c63d36449",
        reservedToken: 20,
        lockedSize: 1,
        bidSize: 0.1,
        auctionScore: 64,
      },
      {
        walletAddress: "0xa403a6cf59a3ae0867b63839d48125dd3248c63c4e3bd1bafca7cb29c56ee7c1",
        reservedToken: 8,
        lockedSize: 1,
        bidSize: 0.05,
        auctionScore: 40,
      },
      {
        walletAddress: "0x27c4ae3d4d8eca7b8698f9816fae31fc15487500036d804285dcaa564122b37a",
        reservedToken: 6,
        lockedSize: 3,
        bidSize: 0.05,
        auctionScore: 35,
      },
      {
        walletAddress: "0xb2259f27cbfd1f4ea4016d189459e3eff7389cf0140aa3b344154c989f6d2910",
        reservedToken: 30,
        lockedSize: 1,
        bidSize: 0.05,
        auctionScore: 5,
      },
    ],
    image: unicornSolami,
  },
  3: {
    name: "Escape the Matrix",
    creator: "0xdddf0a2581606cfa9167552bba1a2e56f0afe2ecdf90bfd8359ff7fcb706d206",
    endsIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    totalLockedValue: "20 Sui",
    totalBids: 2,
    symbol: "$ETM",
    description: "i love tacos.",
    users: [
      {
        walletAddress: "0x81ec632765fcd1139a8ee1759130a524e25986aec00d96fad5875e785ac1962d",
        reservedToken: 800,
        lockedSize: 10,
        bidSize: 375,
        auctionScore: 70,
      },
      {
        walletAddress: "0x05c499e0225bf946f3b57a499fde3279d1b332ce687566fe574a8506deaa2969",
        reservedToken: 700,
        lockedSize: 10,
        bidSize: 2,
        auctionScore: 428,
      },
    ],
    image: escapeMatrix,
  },
};

export default function TokenPage() {
  const params = useParams();
  const mintAddress = params.id as string;
  const [token, setToken] = useState<Token | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let allData = [];
        try {
          const response = await fetch("http://localhost:3001/orders"); // Adjust the URL as needed

          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          let data = await response.json();
          data = data.map((order: any) => {
            return {
              ...order,
              totalBids: order.users.reduce((acc: number, user: any) => acc + user.bidSize, 0),
              totalLockedValue: order.users.reduce((acc: number, user: any) => acc + user.lockedSize, 0),
              endsIn: new Date(order.endsAt).getTime(),
              image: order.imageUrl
            };
          });
          allData = data.concat(Object.values(tokens));
        } catch (error) {
          console.error('Error fetching orders:', error);
          allData = Object.values(tokens); // Proceed with local tokens if server fails
        }
        
        const foundToken =allData.find(
          (t:any) => t.creator === mintAddress,
        );


        setToken(foundToken || null);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
   
  }, [mintAddress]);

  const fetchComments = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${token.creator}`,
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!token) {
    return <div>Token not found</div>;
  }

  return (
    <div className="container flex flex-row mx-auto px-4 py-8 min-h-screen bg-notebook-squares bg-theme-bg text-theme-text transition-colors duration-300 gap-8">
      <div className="flex flex-col w-3/4 gap-8">
        <TokenAllocation symbol={token.symbol} allocations={token.users} />
        <CommentSection
          comments={comments}
          coinId={token.creator}
          refreshComments={fetchComments}
        />
      </div>
      <div className="flex flex-col w-1/4 gap-8">
        <TokenDetails 
          totalBids={`${token.totalBids} Sui`} 
          totalLockedValue={
        typeof token.totalLockedValue === 'number' 
          ? `${token.totalLockedValue} Sui` 
          : token.totalLockedValue
          } 
          name={token.name} 
          endsIn={token.endsIn} 
        />
        <AuctionAction devWalletAddress={token.creator} />
        <AuctionDetails
          createdBy={token.creator}
          name={token.name}
          description={token.description}
          image={token.image}
        />
      </div>
    </div>
  );
}
