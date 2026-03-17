"use client";

import { useEffect, useState } from "react";

export default function PaywallPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("quiz_data");
    if (data) setName(JSON.parse(data).name || "");
  }, []);

  const plans = [
    {
      name: "Weekly",
      price: "$9.99",
      period: "/week",
      features: ["Unlimited AI conversations", "Daily insights", "Basic analysis"],
      popular: false,
    },
    {
      name: "Monthly",
      price: "$29.99",
      period: "/month",
      features: ["Unlimited AI conversations", "Deep analysis reports", "Personalized growth plan", "Priority support"],
      popular: true,
    },
    {
      name: "Yearly",
      price: "$199.99",
      period: "/year",
      features: ["Everything in Monthly", "Custom AI personality tuning", "Export your data", "Early access to features"],
      popular: false,
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">
          {name ? `${name}, unlock` : "Unlock"} your full potential
        </h1>
        <p className="text-foreground/60 text-lg">
          Continue your journey with unlimited access to your AI twin
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
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
              onClick={() => alert("Payment is not implemented in this demo.")}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-foreground/30 text-sm mt-8">
        Cancel anytime. No questions asked.
      </p>
    </div>
  );
}
