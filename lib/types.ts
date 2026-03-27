export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AnalysisResult {
  stressLevel: "low" | "medium" | "high";
  mainThemes: string[];
  emotionalPatterns: string;
  copingStrategies: string;
  recommendation: string;
}
