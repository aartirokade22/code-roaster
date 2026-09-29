import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  number,
  title,
  children,
}: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2 mb-3">
      <span className="font-mono text-xs font-bold tracking-widest text-[#141414] uppercase">
        {formattedNumber} // {title}
      </span>
      {children && <div>{children}</div>}
    </div>
  );
}
