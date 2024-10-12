import CopyText from "../ui/CopyText";
import Link from "next/link";

interface AllocationItem {
  walletAddress: string;
  reservedToken: number;
  lockedSize: number;
  bidSize: number;
  auctionScore: number;
}

export default function TokenAllocation({
  symbol,
  allocations,
}: {
  symbol: string;
  allocations: AllocationItem[];
}) {
  return (
    <div className="bg-theme-bg text-theme-text rounded-lg shadow-md p-6 transition-colors duration-300 border">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">All Bids</h2>{" "}
        <Link
          href={""}
          className="text-xl underline decoration-purple-500/30 hover:underline hover:decoration-purple-500"
        >
          How it is calculated
        </Link>
      </div>
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Bidder</th>
              <th className="pb-2">Reserved {symbol}</th>
              <th className="pb-2">Locked Size</th>
              <th className="pb-2">Bid Size</th>
              <th className="pb-2">Auction Score</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((item, index) => (
              <tr key={index} className="border-t border-theme-text/10">
                <td className="py-2">
                  <div className="flex items-center">
                    <CopyText
                      label=""
                      value={item.walletAddress}
                      labelSize="text-sm"
                      valueSize="text-sm"
                    />
                    {index === 0 && (
                      <span className="mr-1 text-sm text-theme-text/60">
                        (dev)
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2">
                  {item.reservedToken
                    ? `${Math.round(item.reservedToken)} M`
                    : `${Math.round(item.lockedSize * 120)} M`}
                </td>
                <td className="py-2">{item.lockedSize.toFixed(2)} Sui</td>
                <td className="py-2">
                  {index === 0 ? '∞' : `${item.bidSize.toFixed(2)} Sui`}
                </td>
                <td className="py-2">
                  {index === 0 ? '∞' : item.auctionScore.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
