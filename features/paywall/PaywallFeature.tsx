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
    <div className="w-full max-w-3xl animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      <div className="text-center mb-10">
        <p className="text-xs font-medium text-primary/70 uppercase tracking-[0.12em] mb-3">
          Unlock full access
        </p>
        <h1 className="text-[2.1rem] font-semibold leading-[1.2] tracking-[-0.02em] mb-3">
          {name ? `${name}, start your journey` : "Start your journey"}
        </h1>
        <p className="text-muted-foreground text-[15px] max-w-sm mx-auto leading-relaxed">
          Unlimited conversations with your AI twin. Cancel anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            onSelect={() => alert("Payment is not implemented in this demo.")}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        {["No hidden fees", "Cancel anytime", "Secure checkout"].map((item) => (
          <span key={item} className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
            <svg className="w-3 h-3 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
