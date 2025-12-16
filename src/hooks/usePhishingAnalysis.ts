import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  classification: "safe" | "suspicious" | "phishing";
  confidence: number;
  explanation: string;
  riskFactors: string[];
  recommendations: string[];
}

type AnalysisType = "url" | "domain" | "email";

export const usePhishingAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (type: AnalysisType, content: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke("analyze-phishing", {
        body: { type, content }
      });

      if (functionError) {
        throw new Error(functionError.message || "Analysis failed");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyze,
    result,
    isLoading,
    error,
    reset
  };
};