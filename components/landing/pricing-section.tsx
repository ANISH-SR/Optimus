"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Maker",
    description: "Passive liquidity provision",
    fee: "0.00%",
    feeSub: "fee rebate on maker orders",
    features: [
      "Provide liquidity to the pool",
      "ZK position hiding",
      "Pyth oracle price feeds",
      "Anchor-verified proofs",
      "Solvency proof access",
    ],
    cta: "Provide Liquidity",
    popular: false,
  },
  {
    name: "Taker",
    description: "Directional trading",
    fee: "0.05%",
    feeSub: "taker fee per trade",
    features: [
      "Up to 100x leverage",
      "ZK position hiding",
      "Hidden position size",
      "Hidden position direction",
      "Pyth oracle liquidations",
      "No MEV / front-running",
    ],
    cta: "Start Trading",
    popular: true,
  },
  {
    name: "Protocol",
    description: "Protocol-level access",
    fee: "Custom",
    feeSub: "for institutions & protocols",
    features: [
      "Everything in Taker",
      "Direct program CPI calls",
      "Custom margin models",
      "Dedicated Helius RPC",
      "Priority queue access",
      "Custom liquidation bots",
      "Full SDK + IDL access",
      "Whitepaper collaboration",
    ],
    cta: "Contact Team",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-primary/60 uppercase block mb-6">
            Fee Structure
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Transparent fees.
            <br />
            <span className="text-stroke text-muted-foreground">Zero custody risk.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Non-custodial, no KYC. Pay only trading fees. Fees go to the protocol liquidity pool.
          </p>
        </div>

        {/* Fee Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`relative p-8 lg:p-12 bg-background ${
                tier.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-primary" : ""
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Common
                </span>
              )}

              {/* Tier Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-primary/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 font-mono">{tier.description}</p>
              </div>

              {/* Fee */}
              <div className="mb-8 pb-8 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <span className={`font-display text-5xl lg:text-6xl ${tier.popular ? "text-primary" : "text-foreground"}`}>
                    {tier.fee}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm font-mono">{tier.feeSub}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground font-mono">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/trade"
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-mono transition-all group rounded ${
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                }`}
                id={`pricing-cta-${tier.name.toLowerCase()}`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground font-mono">
          All tiers: non-custodial, no KYC, no registration required.{" "}
          <a href="#" className="text-primary hover:underline underline-offset-4 transition-colors">
            Read fee whitepaper ↗
          </a>
        </p>
      </div>
    </section>
  );
}
