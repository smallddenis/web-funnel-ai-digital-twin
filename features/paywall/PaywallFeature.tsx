"use client";

import { useEffect, useState } from "react";
import { PricingCard } from "./PricingCard";
import { PLANS } from "./constants";

export function PaywallFeature() {
  const [name, setName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("quiz_data");
    if (data) setName(JSON.parse(data).name || "");
  }, []);

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
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            onSelect={() => alert("Payment is not implemented in this demo.")}
          />
        ))}
      </div>

      <p className="text-center text-foreground/30 text-sm mt-8">
        Cancel anytime. No questions asked.
      </p>
    </div>
  );
}
