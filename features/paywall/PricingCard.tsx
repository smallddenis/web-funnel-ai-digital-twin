"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

interface PricingCardProps {
  plan: Plan;
  onSelect: () => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <div className={cn(
      "relative rounded-2xl p-5 flex flex-col transition-all duration-200",
      plan.popular
        ? "border border-primary/40 bg-[rgba(58,124,255,0.07)] shadow-[0_0_0_1px_rgba(58,124,255,0.18)]"
        : "border border-border bg-input hover:border-[rgba(255,255,255,0.12)]"
    )}>
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="text-[10px] backdrop-blur uppercase tracking-wide shadow-[0_0_12px_rgba(58,124,255,0.4)]">
            Most popular
          </Badge>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-3">{plan.name}</p>

      <div className="mb-5">
        <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
        <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
      </div>

      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "default" : "outline"}
        className="w-full"
        onClick={onSelect}
      >
        Get started
      </Button>
    </div>
  );
}
