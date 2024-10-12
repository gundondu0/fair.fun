"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type FontContextType = {
  isRoboto: boolean;
  toggleFont: () => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isRoboto, setIsRoboto] = useState(false);

  const toggleFont = () => {
    setIsRoboto((prev) => !prev);
  };

  return (
    <FontContext.Provider value={{ isRoboto, toggleFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
