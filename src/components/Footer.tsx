import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about-us" className="relative border-t border-border bg-card/70 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 ring-1 ring-white/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                PhishGuard AI
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered phishing detection built to protect users from
              malicious emails and unsafe URLs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary/70" />
                Email Scanner
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary/70" />
                URL Scanner
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Security & Privacy</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-emerald-500" />
                Privacy-first analysis
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-emerald-500" />
                No data stored
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-emerald-500" />
                AI-powered threat detection
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Made by Team ByteRush</h4>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PhishGuard AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
