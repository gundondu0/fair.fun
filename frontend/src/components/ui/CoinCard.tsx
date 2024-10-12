import Link from "next/link";
import CopiableText from "./CopyText";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CoinCardProps {
  mintAddress: string;
  name: string;
  createdBy: string;
  endsIn: string;
  totalLockedValue: string;
  totalBids: string;
  description: string;
  image: StaticImageData | string;
}

export default function CoinCard({
  mintAddress,
  name,
  createdBy,
  endsIn,
  totalLockedValue,
  totalBids,
  description,
  image,
}: CoinCardProps) {
  return (
    <div className="bg-theme-bg rounded-lg shadow-md p-4 flex text-theme-text border border-theme-text/10 transition-colors duration-300 hover:bg-theme-text/10">
      <div className="w-16 h-16 mr-4 relative">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex-grow">
        <Link href={`/${mintAddress}`}>
          <h3 className="font-bold text-lg">{name}</h3>
        </Link>
        <CopiableText
          label="Created by:"
          value={createdBy}
          labelSize="text-sm"
          valueSize="text-sm"
          iconSize={16}
        />
        <p className="text-sm opacity-70">Ends in: {endsIn}</p>
        <p className="text-sm opacity-70">
          Total Locked: {totalLockedValue}
        </p>
        <p className="text-sm opacity-70">Total Bids: {totalBids}</p>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  );
}
