"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "ZK Position Hiding",
    description: "Open long/short positions using Pedersen commitments. Your size, direction, and leverage are cryptographically concealed from all other market participants — even the protocol itself cannot read your position until liquidation.",
    visual: "zk",
  },
  {
    number: "02",
    title: "On-Chain Solvency Proofs",
    description: "The protocol publishes Merkle-tree based solvency proofs every epoch. Anyone can verify the DEX is fully solvent without learning individual positions. Trustless, transparent, and mathematically guaranteed.",
    visual: "solvency",
  },
  {
    number: "03",
    title: "Solana-Native Execution",
    description: "Built with Anchor programs on Solana for sub-400ms settlement. Pyth oracle feeds provide tamper-resistant price data. Position commitments, margin deposits, and liquidations all happen on-chain.",
    visual: "solana",
  },
  {
    number: "04",
    title: "MEV-Resistant Design",
    description: "Since position data is hidden, front-running and sandwich attacks are cryptographically impossible. Liquidations are triggered by range proofs, not by reading open positions from state.",
    visual: "mev",
  },
];

function ZKVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="zkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.72 0.18 155)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 155)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Glow background */}
      <ellipse cx="100" cy="80" rx="60" ry="50" fill="url(#zkGlow)" />
      
      {/* Commitment box */}
      <rect x="60" y="50" width="80" height="60" rx="4" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
      </rect>
      
      {/* Lock icon inside */}
      <rect x="88" y="72" width="24" height="20" rx="3" fill="oklch(0.72 0.18 155)" opacity="0.8" />
      <path d="M 93 72 L 93 65 Q 93 59 100 59 Q 107 59 107 65 L 107 72" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Hash lines radiating */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const r1 = 48, r2 = 65;
        const x1 = (100 + Math.cos(angle) * r1).toFixed(2);
        const y1 = (80 + Math.sin(angle) * r1).toFixed(2);
        const x2 = (100 + Math.cos(angle) * r2).toFixed(2);
        const y2 = (80 + Math.sin(angle) * r2).toFixed(2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="oklch(0.72 0.18 155)"
            strokeWidth="1"
            opacity="0.3"
          >
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </line>
        );
      })}
      
      {/* Text: HIDDEN */}
      <text x="100" y="145" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.5">
        commitment: 0xf3a8...
      </text>
    </svg>
  );
}

function SolvencyVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      {/* Merkle tree */}
      {/* Root */}
      <circle cx="100" cy="25" r="10" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="1.5">
        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Level 1 */}
      <circle cx="60" cy="65" r="8" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="140" cy="65" r="8" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="1.5" opacity="0.7" />
      
      {/* Level 2 */}
      {[35, 85, 115, 165].map((x, i) => (
        <circle key={i} cx={x} cy="110" r="6" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.5" />
      ))}
      
      {/* Edges root -> l1 */}
      <line x1="100" y1="35" x2="60" y2="57" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="35" x2="140" y2="57" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.4" />
      
      {/* Edges l1 -> l2 */}
      <line x1="60" y1="73" x2="35" y2="104" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="73" x2="85" y2="104" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="73" x2="115" y2="104" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="73" x2="165" y2="104" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.3" />
      
      {/* Checkmark at root */}
      <path d="M 95 25 L 99 29 L 107 21" fill="none" stroke="oklch(0.72 0.18 155)" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;1" dur="1.5s" repeatCount="indefinite" />
      </path>
      
      <text x="100" y="148" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.5">
        solvency: verified ✓
      </text>
    </svg>
  );
}

function SolanaVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      {/* Block chain visualization */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={10 + i * 47}
            y={55}
            width={38}
            height={50}
            rx="3"
            fill="none"
            stroke="oklch(0.72 0.18 155)"
            strokeWidth="1.5"
            opacity={0.3 + i * 0.2}
          >
            <animate attributeName="opacity" values={`${0.3 + i * 0.2};${0.6 + i * 0.1};${0.3 + i * 0.2}`} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
          {/* Slot number */}
          <text x={29 + i * 47} y={76} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.6">
            {`#${304210 + i}`}
          </text>
          <text x={29 + i * 47} y={90} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.4">
            TXN
          </text>
          {/* Arrow between blocks */}
          {i < 3 && (
            <path
              d={`M ${48 + i * 47} 80 L ${57 + i * 47} 80`}
              stroke="oklch(0.72 0.18 155)"
              strokeWidth="1"
              opacity="0.4"
              markerEnd="url(#arr)"
            />
          )}
        </g>
      ))}
      
      <text x="100" y="130" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.4">
        400ms avg
      </text>
      
      {/* Pyth label */}
      <rect x="60" y="20" width="80" height="22" rx="3" fill="oklch(0.72 0.18 155)" fillOpacity="0.1" stroke="oklch(0.72 0.18 155)" strokeWidth="1" opacity="0.5" />
      <text x="100" y="35" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.7">
        Pyth Oracle ⚡
      </text>
    </svg>
  );
}

function MEVVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      {/* MEV bot - crossed out */}
      <g opacity="0.5">
        <rect x="30" y="40" width="55" height="80" rx="6" fill="none" stroke="oklch(0.60 0.22 25)" strokeWidth="1.5" />
        <text x="57" y="85" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="oklch(0.60 0.22 25)">BOT</text>
        {/* X mark */}
        <line x1="30" y1="40" x2="85" y2="120" stroke="oklch(0.60 0.22 25)" strokeWidth="2" />
        <line x1="85" y1="40" x2="30" y2="120" stroke="oklch(0.60 0.22 25)" strokeWidth="2" />
      </g>
      
      {/* ZK shield */}
      <path
        d="M 130 30 L 175 48 L 175 90 Q 175 125 130 140 Q 85 125 85 90 L 85 48 Z"
        fill="none"
        stroke="oklch(0.72 0.18 155)"
        strokeWidth="2"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="130" y="91" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="oklch(0.72 0.18 155)">
        ZK
      </text>
      <text x="130" y="103" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="oklch(0.72 0.18 155)" opacity="0.6">
        SHIELD
      </text>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "zk": return <ZKVisual />;
    case "solvency": return <SolvencyVisual />;
    case "solana": return <SolanaVisual />;
    case "mev": return <MEVVisual />;
    default: return <ZKVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-border">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-primary/50">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:text-primary transition-colors duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="protocol"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            Protocol
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Privacy without compromise.
            <br />
            <span className="text-muted-foreground">Provably solvent, always.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
