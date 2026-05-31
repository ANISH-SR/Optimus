"use client";

import { useEffect, useState, useRef } from "react";

const programs = [
  { name: "zeroperp_vault", address: "ZrP1...a7f3", status: "active", latency: "~1 slot" },
  { name: "zeroperp_positions", address: "ZrP2...b8c4", status: "active", latency: "~1 slot" },
  { name: "zeroperp_oracle", address: "ZrP3...c9d5", status: "active", latency: "~400ms" },
  { name: "zeroperp_liquidator", address: "ZrP4...d0e6", status: "active", latency: "~2 slots" },
  { name: "groth16_verifier", address: "Gth1...e1f7", status: "active", latency: "~3 slots" },
  { name: "pyth_price_feed", address: "FsJ3...f2g8", status: "active", latency: "real-time" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % programs.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              On-Chain Architecture
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Fully on-chain.
              <br />
              <span className="text-muted-foreground">No off-chain shortcuts.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Every component — commitments, proofs, liquidations, oracles — lives in Anchor programs 
              on Solana. No relayers, no sequencers, no trust assumptions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-primary">6</div>
                <div className="text-sm text-muted-foreground font-mono">Anchor programs</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-primary">~400ms</div>
                <div className="text-sm text-muted-foreground font-mono">Block time</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-primary">0</div>
                <div className="text-sm text-muted-foreground font-mono">Off-chain deps</div>
              </div>
            </div>
          </div>

          {/* Right: Program list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
                <span className="text-sm font-mono text-muted-foreground">Solana Programs</span>
                <span className="flex items-center gap-2 text-xs font-mono text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Devnet live
                </span>
              </div>

              {/* Programs */}
              <div>
                {programs.map((program, index) => (
                  <div
                    key={program.address}
                    className={`px-6 py-4 border-b border-border last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeProgram === index ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeProgram === index ? "bg-primary" : "bg-border"
                        }`}
                      />
                      <div>
                        <div className="font-mono text-sm text-foreground">{program.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{program.address}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{program.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
