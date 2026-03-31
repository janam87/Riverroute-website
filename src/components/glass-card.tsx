import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "normal" | "strong";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "normal",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "strong" ? "glass-strong" : "glass",
        hover &&
          "transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
