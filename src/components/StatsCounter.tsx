import { useEffect, useState } from "react";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

const StatItem = ({ value, suffix = "", label }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-4xl md:text-5xl font-bold text-primary">
        {count}{suffix}
      </p>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-sm">
      <StatItem value={98} suffix="%" label="Client Satisfaction" />
      <StatItem value={500} suffix="+" label="Threats Detected" />
    </div>
  );
};

export default StatsCounter;
