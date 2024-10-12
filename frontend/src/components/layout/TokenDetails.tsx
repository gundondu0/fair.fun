import Countdown from "react-countdown";

interface TokenDetailsProps {
  name: string;
  endsIn: Date;
  totalLockedValue: string;
  totalBids: string;
}

// Add this interface for the renderer props
interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export default function TokenDetails({ name, endsIn,totalBids,totalLockedValue }: TokenDetailsProps) {
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
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="bg-theme-bg text-theme-text rounded-lg shadow-md p-4 transition-colors duration-300 border">
      <div className="flex flex-row gap-2 items-center">
        <p className="font-semibold">Ends in:</p>
        <Countdown date={endsIn} renderer={renderer} />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="font-semibold">Total Locked:</p>
        <p>{totalLockedValue}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="font-semibold">Total Bid:</p>
        <p>{totalBids}</p>
      </div>
    </div>
  );
}
