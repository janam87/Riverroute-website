"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TypewriterEffectProps {
  lines: string[];
  className?: string;
  charDelay?: number;
  lineDelay?: number;
  onComplete?: () => void;
}

export const TypewriterEffect = ({
  lines,
  className,
  charDelay = 0.04,
  lineDelay = 0.3,
  onComplete,
}: TypewriterEffectProps) => {
  const fullText = lines.join("\n");
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i >= fullText.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }
      i++;
      setVisibleCount(i);
      const delay = fullText[i - 1] === "\n" ? lineDelay * 1000 : charDelay * 1000;
      timeout = setTimeout(type, delay);
    };

    timeout = setTimeout(type, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleText = fullText.slice(0, visibleCount);
  const visibleLines = visibleText.split("\n");

  return (
    <div className={cn("font-bold", className)}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="flex items-center justify-center flex-wrap min-h-[1.2em]">
          <span className="whitespace-pre">
            {visibleLines[lineIdx] || ""}
          </span>
          {lineIdx === visibleLines.length - 1 && !done && (
            <span
              className="inline-block bg-white ml-0.5 align-middle animate-pulse"
              style={{ width: 3, height: "0.85em" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
