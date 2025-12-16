import { Shield, AlertTriangle, XCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalysisResult } from "@/hooks/usePhishingAnalysis";

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const getStatusConfig = (classification: string) => {
    switch (classification.toLowerCase()) {
      case "safe":
        return {
          icon: CheckCircle,
          bgClass: "bg-safe/10 border-safe/30",
          iconClass: "text-safe",
          titleClass: "text-safe",
          label: "Safe"
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          bgClass: "bg-suspicious/10 border-suspicious/30",
          iconClass: "text-suspicious",
          titleClass: "text-suspicious",
          label: "Suspicious"
        };
      case "phishing":
        return {
          icon: XCircle,
          bgClass: "bg-phishing/10 border-phishing/30",
          iconClass: "text-phishing",
          titleClass: "text-phishing",
          label: "Phishing Detected"
        };
      default:
        return {
          icon: Info,
          bgClass: "bg-muted/50 border-border",
          iconClass: "text-muted-foreground",
          titleClass: "text-muted-foreground",
          label: "Unknown"
        };
    }
  };

  const config = getStatusConfig(result.classification);
  const StatusIcon = config.icon;

  return (
    <div className={cn(
      "mt-4 p-5 rounded-xl border-2 transition-all duration-300",
      config.bgClass
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-lg", config.bgClass)}>
          <StatusIcon className={cn("h-6 w-6", config.iconClass)} />
        </div>
        <div>
          <h4 className={cn("text-lg font-semibold", config.titleClass)}>
            {config.label}
          </h4>
          <p className="text-sm text-muted-foreground">
            Confidence: {result.confidence}%
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-background/50 rounded-lg border border-border/50">
          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Analysis Summary
          </h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {result.riskFactors && result.riskFactors.length > 0 && (
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <h5 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Key Indicators
            </h5>
            <ul className="space-y-2">
              {result.riskFactors.map((factor, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.recommendations && result.recommendations.length > 0 && (
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <h5 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Recommendations
            </h5>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;