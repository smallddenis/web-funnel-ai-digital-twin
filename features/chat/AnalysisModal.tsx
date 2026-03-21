"use client";

import type { AnalysisResult } from "@/types";

interface AnalysisModalProps {
  analysis: AnalysisResult;
  onContinue: () => void;
}

export function AnalysisModal({ analysis, onContinue }: AnalysisModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-card-bg border border-card-border rounded-2xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Your AI Analysis</h2>
        <p className="text-foreground/60 mb-6">
          Based on our conversation, here&apos;s what your AI twin observed:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-input-bg border border-input-border">
            <div className="text-sm text-foreground/50 mb-1">Stress Level</div>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${
                analysis.stressLevel === "high" ? "bg-red-400" :
                analysis.stressLevel === "medium" ? "bg-yellow-400" : "bg-green-400"
              }`} />
              <span className="font-semibold capitalize">{analysis.stressLevel}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-input-bg border border-input-border">
            <div className="text-sm text-foreground/50 mb-2">Main Themes</div>
            <div className="flex flex-wrap gap-2">
              {analysis.mainThemes.map((theme, i) => (
                <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-input-bg border border-input-border">
            <div className="text-sm text-foreground/50 mb-1">Emotional Patterns</div>
            <p className="text-sm">{analysis.emotionalPatterns}</p>
          </div>

          <div className="p-4 rounded-xl bg-input-bg border border-input-border">
            <div className="text-sm text-foreground/50 mb-1">Coping Strategies</div>
            <p className="text-sm">{analysis.copingStrategies}</p>
          </div>

          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
            <div className="text-sm text-accent mb-1">Key Recommendation</div>
            <p className="text-sm font-medium">{analysis.recommendation}</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition"
        >
          Unlock Full Analysis
        </button>
      </div>
    </div>
  );
}
