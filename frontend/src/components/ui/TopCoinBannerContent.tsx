import {
  DiscordLogo,
  GlobeSimple,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import CopiableText from "./CopyText";
import Image from "next/image";
import OnFire from "../../public/image/onFire.jpeg";
import Countdown from "react-countdown";
import Link from "next/link";

interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function TopCoingBannerContent() {
  const mintAddress = "0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6";
  const endDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours from now

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RendererProps) => {
    if (completed) {
      return <span>Auction ended</span>;
    } else {
      return (
        <span className="underline decoration-orange-400/30 font-normal">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="flex flex-row justify-between  w-full text-theme-text transition-colors duration-300 gap-4">
      <div className="flex items-center flex-col w-1/2 border p-4 gap-4 rounded-xl shadow">
        <CopiableText label="created by:" value={mintAddress} />
        <Image
          width={144}
          height={144}
          src={OnFire}
          alt="img"
          className="border border-black rounded-lg"
        />
        <div className="w-64">
          <p className="text-xl text-center font-bold">
        {" "}
        <span className="font-normal">
        In the crypto jungle, one cat reigns supreme Satoshi Pawsamoto.
        </span>
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <DiscordLogo
        size={32}
        weight="thin"
        className="text-theme-text transition-colors duration-300"
          />
          <XLogo
        size={32}
        weight="thin"
        className="text-theme-text transition-colors duration-300"
          />
          <TelegramLogo
        size={32}
        weight="thin"
        className="text-theme-text transition-colors duration-300"
          />
          <GlobeSimple
        size={32}
        weight="thin"
        className="text-theme-text transition-colors duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col w-1/2 justify-start gap-4">
        <p className="text-2xl font-bold">
          coin name:{" "}
          <Link href={"/0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6"}>
            <span className="underline decoration-yellow-400/30 hover:underline hover:decoration-yellow-400 font-normal">
            Satoshi Pawsamoto / $CAT
            </span>
          </Link>
        </p>

        <p className="text-2xl font-bold">
          platform:{" "}
          <span className="underline decoration-red-400/30 font-normal">
            move pump
          </span>
        </p>
        <p className="text-2xl font-bold">
          total locked :{" "}
          <span className="underline decoration-sky-400/30 font-normal">
            1000 Sui
          </span>
        </p>
        <p className="text-2xl font-bold">
          total bids:{" "}
          <span className="underline decoration-pink-400/30 font-normal">
            86 Sui
          </span>
        </p>
        <p className="text-2xl font-bold">
          created at:{" "}
          <span className="underline decoration-teal-400/30 font-normal">
            08/10/2024 3:32:01 AM
          </span>
        </p>
        <p className="text-2xl font-bold">
          ends in: <Countdown date={endDate} renderer={renderer} />
        </p>

        <Link href="/0xa5809d6497c213346ae6108c88bd373ab6be820aeff7faafcc740f64370e16b6">
          <button className="bg-theme-text text-theme-bg font-bold py-2 px-4 rounded hover:bg-theme-text/80 transition-colors duration-300 w-1/4">
            Go!
          </button>
        </Link>
      </div>
    </div>
  );
}
