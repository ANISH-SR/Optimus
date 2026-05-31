"use client";

import { useEffect, useState, useRef } from "react";

const protocols = [
  { name: "Solana", category: "L1 Blockchain" },
  { name: "Anchor", category: "Smart Contract Framework" },
  { name: "Pyth", category: "Price Oracle" },
  { name: "Groth16", category: "ZK Proof System" },
  { name: "circom", category: "Circuit Language" },
  { name: "snarkjs", category: "Proof Generation" },
  { name: "Phantom", category: "Wallet" },
  { name: "Backpack", category: "Wallet" },
  { name: "Pedersen", category: "Commitment Scheme" },
  { name: "SPL Tokens", category: "Token Standard" },
  { name: "Jito", category: "MEV Protection" },
  { name: "Helius", category: "RPC Provider" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            Stack
            <span className="w-8 h-px bg-primary/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Battle-tested
            <br />
            crypto primitives.
          </h2>
          <p className="text-xl text-muted-foreground">
            Built on the most proven ZK and Solana infrastructure available.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees */}
      <div className="w-full mb-4">
        <div className="flex gap-4 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-4 shrink-0">
              {protocols.map((p) => (
                <div
                  key={`${p.name}-${setIndex}`}
                  className="shrink-0 px-6 py-4 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group rounded-lg"
                >
                  <div className="text-base font-mono font-medium group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-4 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-4 shrink-0">
              {[...protocols].reverse().map((p) => (
                <div
                  key={`${p.name}-reverse-${setIndex}`}
                  className="shrink-0 px-6 py-4 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group rounded-lg"
                >
                  <div className="text-base font-mono font-medium group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
