import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  style,
}) => (
  <div
    className={cn(
      "w-8 h-8 rounded-lg flex items-center justify-center bg-brand-primary",
      className
    )}
    style={style}
  >
    <span className="text-white font-bold text-sm">TF</span>
  </div>
);
