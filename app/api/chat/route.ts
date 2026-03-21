import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are a compassionate AI digital twin therapist. Your role is to help users reflect on their stress experiences. Be empathetic, ask thoughtful follow-up questions, and help users explore their feelings. Keep responses concise (2-3 sentences).`;

const ANALYSIS_PROMPT = `Based on the following conversation, provide a structured psychological analysis. Return ONLY valid JSON with this exact structure:
{
  "stressLevel": "low" | "medium" | "high",
  "mainThemes": ["theme1", "theme2", "theme3"],
  "emotionalPatterns": "Brief description of emotional patterns observed",
  "copingStrategies": "Brief description of coping strategies mentioned or suggested",
  "recommendation": "One key recommendation for the user"
}`;

export async function POST(req: NextRequest) {
  const { messages, analyze } = await req.json() as {
    messages: ChatMessage[];
    analyze?: boolean;
  };

  const apiKey = process.env.GROQ_API_KEY;

  // If no API key, use deterministic fallback
  if (!apiKey) {
    if (analyze) {
      return NextResponse.json(generateDeterministicAnalysis(messages));
    }
    return NextResponse.json({
      role: "assistant",
      content: getDeterministicResponse(messages.length),
    });
  }

  // Use Groq API
  try {
    const systemPrompt = analyze ? ANALYSIS_PROMPT : SYSTEM_PROMPT;
    const groqMessages = analyze
      ? [{ role: "user" as const, content: messages.map((m) => `${m.role}: ${m.content}`).join("\n") }]
      : messages.map((m) => ({ role: m.role, content: m.content }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: [{ role: "system", content: systemPrompt }, ...groqMessages],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "I'm here to listen. Please continue.";

    if (analyze) {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return NextResponse.json(JSON.parse(jsonMatch?.[0] || text));
      } catch {
        return NextResponse.json(generateDeterministicAnalysis(messages));
      }
    }

    return NextResponse.json({ role: "assistant", content: text });
  } catch {
    if (analyze) {
      return NextResponse.json(generateDeterministicAnalysis(messages));
    }
    return NextResponse.json({
      role: "assistant",
      content: getDeterministicResponse(messages.length),
    });
  }
}

function getDeterministicResponse(messageCount: number): string {
  const responses = [
    "Thank you for sharing that. Can you tell me more about what specifically triggered that stress?",
    "I hear you. How did that situation make you feel physically? Sometimes our bodies hold onto stress in specific ways.",
    "That sounds challenging. What thoughts were going through your mind during that moment?",
    "I appreciate your openness. Have you noticed any patterns in when this kind of stress tends to come up?",
    "Thank you for reflecting on this. What do you think would help you feel more at ease in similar situations?",
  ];
  return responses[Math.min(messageCount, responses.length - 1) % responses.length];
}

function generateDeterministicAnalysis(messages: ChatMessage[]) {
  const userMessages = messages.filter((m) => m.role === "user");
  const allText = userMessages.map((m) => m.content).join(" ").toLowerCase();

  const stressKeywords = ["stress", "anxious", "worried", "overwhelmed", "tired", "exhausted", "frustrated"];
  const stressCount = stressKeywords.filter((k) => allText.includes(k)).length;

  return {
    stressLevel: stressCount >= 3 ? "high" : stressCount >= 1 ? "medium" : "low",
    mainThemes: extractThemes(allText),
    emotionalPatterns: "User shows reflective awareness of their stress triggers and emotional responses.",
    copingStrategies: "Consider mindfulness practices, structured breaks, and talking through feelings with trusted people.",
    recommendation: "Practice a 5-minute daily check-in with yourself to identify and acknowledge stress early.",
  };
}

function extractThemes(text: string): string[] {
  const themeMap: Record<string, string> = {
    work: "Work-related stress",
    family: "Family dynamics",
    sleep: "Sleep concerns",
    health: "Health anxiety",
    money: "Financial stress",
    friend: "Social relationships",
    lonely: "Loneliness",
    future: "Future uncertainty",
  };

  const found = Object.entries(themeMap)
    .filter(([key]) => text.includes(key))
    .map(([, value]) => value);

  return found.length > 0 ? found.slice(0, 3) : ["Self-reflection", "Emotional awareness", "Personal growth"];
}
