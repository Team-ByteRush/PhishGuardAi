import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalysisTabs from "@/components/AnalysisTabs";
import Footer from "@/components/Footer";

// Vite-safe image imports
import phishingUrl from "@/assets/phishing-url.png";
import phishingUrgency from "@/assets/phishing-urgency.png";
import phishingEmail from "@/assets/phishing-email.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <HeroSection />

      <main className="container mx-auto px-4 py-20">
        <AnalysisTabs />

        <section className="mt-28 max-w-6xl mx-auto">
          <h3
            className="
              text-center text-3xl md:text-4xl font-extrabold mb-14
              bg-gradient-to-r from-primary via-cyan-400 to-purple-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_20px_rgba(99,102,241,0.35)]
            "
          >
            How to Spot Phishing Attempts
          </h3>

          <div className="grid gap-10 md:grid-cols-3">
            <FlipCard
              title="Suspicious URLs"
              image={phishingUrl}
              description="Watch for misspelled domains, odd subdomains, extra characters, or URLs that don’t match the real organization."
            />

            <FlipCard
              title="Urgency Tactics"
              image={phishingUrgency}
              description="Phishing attacks often use fear or urgency—account suspension, payments, or deadlines—to push fast decisions."
            />

            <FlipCard
              title="Sender Verification"
              image={phishingEmail}
              description="Always inspect the sender’s full email address. Legitimate companies never use random or public domains."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

/* =========================================================
   Flip Card Component
   ========================================================= */

const FlipCard = ({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) => {
  return (
    <div className="group perspective-[1400px]">
      <div
        className="
          relative h-72 w-full rounded-2xl
          transition-all duration-700
          [transform-style:preserve-3d]
          group-hover:scale-[1.06]
          group-hover:[transform:rotateY(180deg)]
        "
      >
        <div
          className="
            absolute inset-0 rounded-2xl
            border border-border
            bg-card/80 backdrop-blur
            shadow-lg
            ring-1 ring-white/10
            group-hover:ring-primary/40
            group-hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
            transition-all
            [backface-visibility:hidden]
            flex flex-col items-center justify-center p-6
          "
        >
          <img
            src={image}
            alt={title}
            className="h-20 w-20 object-contain mb-5"
            loading="lazy"
          />
          <h4 className="text-lg font-semibold text-foreground text-center">
            {title}
          </h4>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Hover to learn more
          </p>
        </div>

        <div
          className="
            absolute inset-0 rounded-2xl
            border border-border
            bg-background/90 backdrop-blur
            shadow-lg
            ring-1 ring-white/10
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
            flex items-center justify-center p-6
          "
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
