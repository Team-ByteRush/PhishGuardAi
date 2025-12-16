import { Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCounter from "./StatsCounter";
import phishingVideo from "@/assets/phishingvideo.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_70%)]" />

        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/20"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `pulse ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Secure Infrastructure</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Empowering Secure
              <br />
              <span className="text-foreground">Data Journeys</span>
            </h1>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mb-8"
            >
              <Eye className="h-4 w-4" />
              MORE ABOUT US
            </Button>

            <p className="text-muted-foreground max-w-md leading-relaxed">
              PhishGuard AI uses advanced artificial intelligence to detect phishing attempts in URLs, domains, and emails. 
              Stay protected with real-time threat analysis and human-readable explanations.
            </p>

            
          </div>

          {/* Right content: Shield + Video + Stats */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            {/* Shield SVG */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
              <div className="relative">
                <svg 
                  viewBox="0 0 200 240" 
                  className="w-48 h-56 md:w-64 md:h-72"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <path 
                    d="M100 10 L180 50 L180 120 C180 180 100 230 100 230 C100 230 20 180 20 120 L20 50 L100 10Z"
                    stroke="url(#shieldGradient)"
                    strokeWidth="3"
                    fill="hsl(var(--primary) / 0.1)"
                    filter="url(#glow)"
                  />
                  
                  <path 
                    d="M100 30 L160 60 L160 115 C160 165 100 205 100 205 C100 205 40 165 40 115 L40 60 L100 30Z"
                    stroke="hsl(var(--primary) / 0.5)"
                    strokeWidth="1"
                    fill="hsl(var(--primary) / 0.05)"
                  />
                  
                  <circle cx="100" cy="100" r="20" fill="hsl(var(--primary))" opacity="0.8" />
                  <rect x="92" y="110" width="16" height="35" rx="4" fill="hsl(var(--primary))" opacity="0.8" />
                  
                  <g stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.7">
                    <path d="M60 80 L80 80 L80 60" />
                    <path d="M140 80 L120 80 L120 60" />
                    <path d="M60 140 L80 140 L80 160" />
                    <path d="M140 140 L120 140 L120 160" />
                    <circle cx="60" cy="80" r="3" fill="hsl(var(--primary))" />
                    <circle cx="140" cy="80" r="3" fill="hsl(var(--primary))" />
                    <circle cx="60" cy="140" r="3" fill="hsl(var(--primary))" />
                    <circle cx="140" cy="140" r="3" fill="hsl(var(--primary))" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Stats */}
            <StatsCounter />

            {/* Video section with controls */}
            <div className="mt-6 w-full flex justify-center">
              <video
                src={phishingVideo}
                className="w-80 md:w-96 rounded-lg shadow-lg border border-primary/30"
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
