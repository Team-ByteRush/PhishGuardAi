import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content } = await req.json();

    if (!type || !content) {
      return new Response(
        JSON.stringify({ error: "Missing type or content parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const _API_KEY = Deno.env.get("_API_KEY");
    if (!_API_KEY) {
      console.error("_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are PhishGuard AI, an expert cybersecurity analyst specialized in detecting phishing, scams, and malicious content. Your task is to analyze the provided ${type} and determine if it's potentially dangerous.

When analyzing, consider:
- For URLs: Check for suspicious patterns like misspellings of known brands, unusual TLDs, excessive subdomains, URL encoding tricks, IP addresses instead of domains, or deceptive paths.
- For domains: Look for typosquatting, homograph attacks, newly registered domains, suspicious TLDs, or impersonation of legitimate organizations.
- For emails: Identify urgency tactics, threatening language, requests for personal information, suspicious links, poor grammar, impersonation attempts, mismatched sender addresses, and emotional manipulation.

You MUST respond with a valid JSON object with this exact structure (no markdown, just JSON):
{
  "classification": "safe" | "suspicious" | "phishing",
  "confidence": number between 0-100,
  "explanation": "A clear, non-technical explanation of why this content was classified this way",
  "riskFactors": ["List of specific red flags found", "Each as a separate string"],
  "recommendations": ["What the user should do", "Safety tips relevant to this case"]
}

Be accurate but err on the side of caution. If something seems off but isn't clearly malicious, mark it as suspicious. Always provide educational explanations that help users learn to identify threats themselves.`;

    const userPrompt = `Analyze this ${type} for potential phishing or malicious activity:

${content}

Provide your analysis in the required JSON format.`;

    console.log(`Analyzing ${type}:`, content.substring(0, 100) + "...");

    const response = await fetch("https://ai.gateway..dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service quota exceeded. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error("No response content from AI");
      return new Response(
        JSON.stringify({ error: "No analysis result received" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI Response:", aiResponse);

    let analysisResult;
    try {
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      analysisResult = {
        classification: "suspicious",
        confidence: 50,
        explanation: "Unable to fully analyze the content. Exercise caution and verify through other means.",
        riskFactors: ["Analysis was inconclusive"],
        recommendations: ["Verify this content through official channels", "Do not click on any links if unsure"]
      };
    }

    const validClassifications = ["safe", "suspicious", "phishing"];
    if (!validClassifications.includes(analysisResult.classification?.toLowerCase())) {
      analysisResult.classification = "suspicious";
    }

    analysisResult.confidence = Math.min(100, Math.max(0, Number(analysisResult.confidence) || 50));

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in analyze-phishing function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});