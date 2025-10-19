import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-gradient-primary opacity-30 blur-xl" />
          </div>
          <svg
            className="w-20 h-20 relative animate-scale-in"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="226"
              strokeDashoffset={226 - (226 * progress) / 100}
              className="transition-all duration-300"
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
            <path
              d="M40 20L50 35H45V50L35 35H40V20Z"
              fill="url(#gradient)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--accent-hover))" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-1">
            SecureSwap
          </h2>
          <p className="text-sm text-muted-foreground">
            Loading your secure marketplace...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
