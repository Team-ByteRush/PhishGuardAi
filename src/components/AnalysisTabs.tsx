import { useState, useCallback } from "react";
import { Link2, Mail, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ResultDisplay from "./ResultDisplay";
import { usePhishingAnalysis } from "@/hooks/usePhishingAnalysis";

type TabType = "email" | "url";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ElementType;
  description: string;
  placeholder: string;
}

const TABS: TabConfig[] = [
  {
    id: "email",
    label: "Email Scanner",
    icon: Mail,
    description:
      "Analyze full email content to detect phishing, spoofing, malicious links, and impersonation attempts.",
    placeholder:
      "Paste the complete email here...\n\nExample: Dear Customer, Your account has been compromised. Click here to verify.",
  },
  {
    id: "url",
    label: "URL Scanner",
    icon: Link2,
    description:
      "Scan URLs for phishing indicators, malicious redirects, domain reputation issues, and hidden threats.",
    placeholder: "https://example.com/suspicious-link",
  },
];

export default function AnalysisTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("email");
  const [inputValue, setInputValue] = useState("");

  const { analyze, result, isLoading, error, reset } = usePhishingAnalysis();
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  const handleTabChange = useCallback(
    (tab: TabType) => {
      setActiveTab(tab);
      setInputValue("");
      reset();
    },
    [reset]
  );

  const handleAnalyze = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;
    await analyze(activeTab, inputValue.trim());
  }, [activeTab, analyze, inputValue, isLoading]);

  return (
    <section id="services" className="relative w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <ShieldCheck className="h-4 w-4" />
          AI Security Scanner
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
  AI‑Powered Phishing Detection
</h1>

        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Instantly scan emails and URLs to identify phishing attempts, malicious links, and online scams with AI‑driven analysis.
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-10">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <Card className="bg-card/80 backdrop-blur border border-border shadow-lg ring-1 ring-white/20 hover:ring-white/30 transition-all">
        <CardHeader>
          <CardTitle className="text-xl">{currentTab.label}</CardTitle>
          <CardDescription>{currentTab.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {activeTab === "email" ? (
            <Textarea
              id="analysis-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentTab.placeholder}
              className="min-h-[200px]"
            />
          ) : (
            <Input
              id="analysis-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentTab.placeholder}
              className="h-12"
            />
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !inputValue.trim()}
            className="w-full h-12"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </span>
            ) : (
              <>Analyze {activeTab === "email" ? "Email" : "URL"}</>
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="mt-8">
          <ResultDisplay result={result} />
        </div>
      )}
    </section>
  );
}
