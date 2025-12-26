import { useRef, useState } from "react";
import { StatCard } from "./StatCard";

interface Stat {
  icon: any;
  value: number;
  label: string;
  href?: string;
}

export const StatCardCarousel = ({ stats }: { stats: Stat[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    setActive(Math.round(scrollLeft / width));
  };

  return (
    <div className="w-full">
      {/* Scroll Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory
          scrollbar-hide
        "
      >
        {stats.map((stat, i) => (
          <div key={i} className="min-w-full snap-center px-1">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Dot Indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {stats.map((_, i) => (
          <span
            key={i}
            className={`
              h-2 w-2 rounded-full transition-all
              ${active === i ? "bg-primary w-4" : "bg-muted"}
            `}
          />
        ))}
      </div>
    </div>
  );
};
