"use client";
import { useFont } from "../contexts/FontContext";

export default function FontWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isRoboto } = useFont();

  return (
    <div className={isRoboto ? "font-roboto" : "font-indie-flower"}>
      {children}
    </div>
  );
}
