"use client";

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
    <div
      className={`bg-card-bg border rounded-2xl p-6 flex flex-col ${
        plan.popular ? "border-primary ring-2 ring-primary/20" : "border-card-border"
      }`}
    >
      {plan.popular && (
        <span className="self-start px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <div className="mt-2 mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className="text-foreground/50">{plan.period}</span>
      </div>

      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`w-full mt-6 px-6 py-3 font-medium rounded-xl transition ${
          plan.popular
            ? "bg-primary hover:bg-primary-hover text-white"
            : "bg-input-bg border border-input-border hover:border-foreground/30 text-foreground"
        }`}
        onClick={onSelect}
      >
        Get Started
      </button>
    </div>
  );
}
