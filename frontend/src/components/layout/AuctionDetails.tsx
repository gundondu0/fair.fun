import {
  DiscordLogo,
  GlobeSimple,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import CopyText from "../ui/CopyText";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface AuctionDetailsProps {
  createdBy: string;
  name: string;
  description: string;
  image: StaticImageData | string;
}

export default function AuctionDetails({
  createdBy,
  name,
  description,
  image,
}: AuctionDetailsProps) {
  return (
    <div className="bg-theme-bg text-theme-text rounded-lg shadow-md p-6 transition-colors duration-300 border">
      <h2 className="text-2xl font-bold mb-4">Token Details</h2>
      <div className="space-y-4">
        <div className="w-full h-48 relative mb-4">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="rounded-md"
          />
        </div>
        <div>
          <CopyText
            label="Created by:"
            value={createdBy}
            labelSize="text-base"
            valueSize="text-base"
          />
        </div>
        <div className="flex flex-row">
          <p className="font-semibold">Name:&nbsp; </p> <p> {name}</p>
        </div>
        <div className="flex flex-row">
          <p className="font-semibold">Description:&nbsp; </p>
          <p> {description}</p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <DiscordLogo size={32} weight="thin" />
          <XLogo size={32} weight="thin" />
          <TelegramLogo size={32} weight="thin" />
          <GlobeSimple size={32} weight="thin" />
        </div>
      </div>
    </div>
  );
}
