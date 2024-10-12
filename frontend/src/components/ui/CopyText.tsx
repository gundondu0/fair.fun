"use client";
import { Copy, Check } from "@phosphor-icons/react";
import { useState } from "react";

interface CopiableTextProps {
  label: string;
  value: string;
  labelSize?: string;
  valueSize?: string;
  iconSize?: number;
}

const CopiableText = ({
  label,
  value,
  labelSize = "text-2xl",
  valueSize = "text-lg",
  iconSize = 20,
}: CopiableTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenAddress = (address: string) => {
    if (address.length <= 6) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex flex-row items-center ">
      <p className={`${labelSize} font-semibold`}>{label}</p>
      <div className="flex items-center rounded p-2">
        <span className={`mr-2 ${valueSize}`}>{shortenAddress(value)}</span>
        <button onClick={handleCopy} className="focus:outline-none">
          {copied ? (
            <Check size={iconSize} weight="thin" className="text-green-500" />
          ) : (
            <Copy size={iconSize} weight="thin" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CopiableText;
