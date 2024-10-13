import { useState, useEffect } from "react";
import CoinCard from "../ui/CoinCard";
import CoinSearch from "../ui/CoinSearch";
import unicornSolami from "../../public/image/unicornSolami.jpeg";
import escapeMatrix from "../../public/image/escapeMatrix.png";

// Placeholder coin data
const placeholderCoins = [
  {
    mintAddress: "0x0de6b9a20a6c28d70ee26ca733ed6d5747aa5ee97b8543e0594e2f6a581bc5cf",
    name: "Unicorn Solami Donut Cat",
    createdBy: "0x0de6b9a20a6c28d70ee26ca733ed6d5747aa5ee97b8543e0594e2f6a581bc5cf",
    endsIn: "5 Days",
    totalLockedValue: "10 Sui",
    totalBids: "0.5 Sui",
    description: "mmm food...",
    image: unicornSolami,
  },
  {
    mintAddress: "0xdddf0a2581606cfa9167552bba1a2e56f0afe2ecdf90bfd8359ff7fcb706d206",
    name: "Escape the Matrix",
    createdBy: "0xdddf0a2581606cfa9167552bba1a2e56f0afe2ecdf90bfd8359ff7fcb706d206",
    endsIn: "1 week",
    totalLockedValue: "20 Sui",
    totalBids: "2 Sui",
    description: "i love tacos.",
    image: escapeMatrix,
  },
];

export default function CoinListLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders"); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const calculateEndsIn = (createdAt:any, endsAt:any) => {
    const diffMs = new Date(endsAt).getTime() - new Date(createdAt).getTime();
  
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
    if (diffDays > 0) {
      return `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} Hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return `${diffMinutes} Minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };

  // Combine fetched orders with placeholder coins

  const allCoins = [
    ...orders.map((order:any) => ({
      mintAddress: order.creator,
      name: order.name,
      createdBy: order.creator,
      endsIn:  calculateEndsIn(order.createdAt, order.endsAt),
      totalLockedValue: order.users.reduce(
        (acc:any, user:any) => acc + user.lockedSize,
        0
      ),
      totalBids: order.users.reduce(
        (acc:any, user:any) => acc + user.bidSize,
        0
      ),
      description: order.description,
      image: order.imageUrl, 
    })),
    ...placeholderCoins,
  ];

  return (
    <div className="container mx-auto p-4 border rounded-2xl bg-theme-bg text-theme-text transition-colors duration-300">
      <CoinSearch onSearch={setSearchQuery} />
      <div className="h-[400px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCoins.map((coin) => (
            <CoinCard
              key={coin.mintAddress}
              mintAddress={coin.mintAddress}
              name={coin.name}
              createdBy={coin.createdBy}
              endsIn={coin.endsIn}
              totalLockedValue={coin.totalLockedValue}
              totalBids={coin.totalBids}
              description={coin.description}
              image={coin.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
