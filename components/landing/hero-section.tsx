"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Shield, Zap } from "lucide-react";
import Link from "next/link";

const tickers = [
  { pair: "BTC-PERP", price: "67,420.50", change: "+2.34%", positive: true },
  { pair: "ETH-PERP", price: "3,842.10", change: "-0.87%", positive: false },
  { pair: "SOL-PERP", price: "184.65", change: "+5.12%", positive: true },
  { pair: "JTO-PERP", price: "3.28", change: "+1.44%", positive: true },
];

const words = ["private", "sealed", "hidden", "shielded"];

function LiveTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % tickers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const t = tickers[currentIdx];

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground border border-border rounded px-3 py-1.5 bg-card">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      <span>{t.pair}</span>
      <span className="text-foreground font-medium">${t.price}</span>
      <span className={t.positive ? "text-primary" : "text-destructive"}>{t.change}</span>
    </div>
  );
}

function ZKCommitmentBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-lg px-4 py-3 bg-card font-mono text-xs flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary text-sm truncate">{value}</span>
    </div>
  );
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grid background */}
      <AnimatedGrid />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Live ticker strip */}
        <div 
          className={`mb-8 flex items-center gap-4 flex-wrap transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live on Solana Devnet
          </span>
          <LiveTicker />
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(3rem,10vw,8rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-foreground">Trade perps.</span>
            <span className="block">
              Stay{" "}
              <span className="relative inline-block">
                <span 
                  key={wordIndex}
                  className="inline-flex text-primary glow-green-text"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-primary/40" />
              </span>
              .
            </span>
          </h1>
        </div>
        
        {/* Description + CTAs */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p 
            className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The first on-chain perpetuals DEX where your position size, direction, 
            and leverage are cryptographically hidden from the market.
            Built on Solana with ZK-SNARKs and Anchor programs.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group font-mono glow-green"
              asChild
            >
              <Link href="/trade" id="hero-launch-app">
                Launch App
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-border hover:bg-accent font-mono"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" id="hero-view-code">
                View Code ↗
              </a>
            </Button>
          </div>
        </div>

        {/* ZK commitment cards */}
        <div
          className={`mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ZKCommitmentBadge 
            label="Your commitment (on-chain)" 
            value="0xf3a8...c721" 
          />
          <ZKCommitmentBadge 
            label="Nullifier hash" 
            value="sha256(secret||nonce)" 
          />
          <ZKCommitmentBadge 
            label="Range proof" 
            value="Groth16 ✓ verified" 
          />
        </div>

        {/* Trust indicators */}
        <div 
          className={`mt-16 flex items-center gap-8 flex-wrap transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { icon: <Lock className="w-3.5 h-3.5" />, label: "Position Privacy" },
            { icon: <Shield className="w-3.5 h-3.5" />, label: "Provable Solvency" },
            { icon: <Zap className="w-3.5 h-3.5" />, label: "~400ms on Solana" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="text-primary">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Stats marquee */}
      <div 
        className={`absolute bottom-12 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "< 0.1%", label: "liquidation leakage", tag: "PRIVACY" },
                { value: "400ms", label: "avg block confirmation", tag: "SOLANA" },
                { value: "100x", label: "max leverage", tag: "PROTOCOL" },
                { value: "Groth16", label: "ZK proof system", tag: "CRYPTOGRAPHY" },
              ].map((stat) => (
                <div key={`${stat.tag}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-3xl lg:text-4xl font-display text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-[10px] mt-1 text-muted-foreground/50">{stat.tag}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
