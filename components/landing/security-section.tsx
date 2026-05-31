"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, GitBranch } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Groth16 ZK proofs",
    description: "All position-related state transitions require a valid Groth16 proof verified on-chain by the Anchor verifier program.",
  },
  {
    icon: Lock,
    title: "Pedersen commitments",
    description: "Positions are committed with cryptographic bindings. Even the protocol cannot determine your position size or direction from the commitment alone.",
  },
  {
    icon: Eye,
    title: "Public solvency proofs",
    description: "Every 24h, the protocol publishes a Merkle-tree solvency proof. Anyone can verify the DEX is fully collateralized without learning any individual position.",
  },
  {
    icon: GitBranch,
    title: "Anchor + program audits",
    description: "Smart contracts written in Rust with the Anchor framework. Full ownership and access control checks on every instruction.",
  },
];

const cryptoPrimitives = ["Groth16", "Pedersen", "Merkle Trees", "Nullifiers", "Range Proofs"];

export function SecuritySection() {
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
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-card overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              Cryptography
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Math doesn&apos;t lie.
              <br />
              <span className="text-muted-foreground">Trust the proof.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              ZeroPerp&apos;s security model requires zero trust in the protocol operators. 
              Every critical property is cryptographically enforced on-chain.
            </p>

            {/* Crypto primitives */}
            <div className="flex flex-wrap gap-3">
              {cryptoPrimitives.map((prim, index) => (
                <span
                  key={prim}
                  className={`px-4 py-2 border border-primary/20 text-sm font-mono text-primary/80 bg-primary/5 transition-all duration-500 rounded ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {prim}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-border hover:border-primary/30 transition-all duration-500 group rounded-lg bg-background/50 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-border group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors duration-300 rounded">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
