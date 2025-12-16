import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))/100] backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
     
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
              <div className="absolute inset-0 bg-[hsl(var(--primary))/30] blur-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                <span className="text-[hsl(var(--primary))]">PHISH</span>
                <span className="text-[hsl(var(--foreground))]">GUARD</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Cyber Security
              </span>
            </div>
          </div>

     
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-[hsl(var(--primary))] text-sm font-medium hover:text-[hsl(var(--primary)/80)] transition-colors"
            >
              HOME
            </a>
            <a
              href="#about-us"
              className="text-muted-foreground text-sm font-medium hover:text-[hsl(var(--foreground))] transition-colors"
            >
              ABOUT US
            </a>
            <a
              href="#services"
              className="text-muted-foreground text-sm font-medium hover:text-[hsl(var(--foreground))] transition-colors"
            >
              SERVICES
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
