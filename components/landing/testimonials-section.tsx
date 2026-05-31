"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "The ZK commitment scheme is elegant. Position privacy at the protocol layer — not at the application layer — is how it should be done.",
    author: "0xKirsch",
    role: "DeFi Protocol Developer",
    company: "Anonymous",
    metric: "No position leakage",
  },
  {
    quote: "Finally a perp DEX where I'm not front-run before my limit orders fill. The ZK hiding of direction makes all the difference.",
    author: "sol_trader_88",
    role: "Perps Trader",
    company: "Independent",
    metric: "0 MEV incidents",
  },
  {
    quote: "Built on Anchor, using Groth16 proofs, with Pyth for oracles — this is exactly the kind of technically rigorous DeFi primitive the ecosystem needs.",
    author: "anchor_dev",
    role: "Solana Developer",
    company: "Hackathon Participant",
    metric: "3 programs, fully on-chain",
  },
  {
    quote: "The solvency proof system is the killer feature. I can verify the protocol is solvent without trusting any intermediary.",
    author: "zk_researcher",
    role: "Cryptography Researcher",
    company: "Academic",
    metric: "Provable solvency",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="relative py-32 lg:py-40 border-t border-border lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-primary/60 uppercase">
            Community
          </span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Quote */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-foreground">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-mono text-sm text-primary">
                  {activeTestimonial.author.slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-base font-mono font-medium text-foreground">{activeTestimonial.author}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {activeTestimonial.role} · {activeTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 border border-primary/20 rounded-lg bg-primary/5 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-xs tracking-widest text-primary/60 uppercase block mb-4">
                Key Result
              </span>
              <p className="font-display text-3xl md:text-4xl text-primary">
                {activeTestimonial.metric}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    idx === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ecosystem partners */}
        <div className="mt-24 pt-12 border-t border-border">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            Built for the Solana ecosystem
          </p>
        </div>
      </div>
      
      {/* Full-width marquee */}
      <div className="w-full">
        <div className="flex gap-16 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {["Solana Foundation", "Pyth Network", "Helius", "Jito Labs", "Coral / Anchor", "Drift Protocol", "Zeta Markets", "Mango Markets"].map(
                (company) => (
                  <span
                    key={`${setIdx}-${company}`}
                    className="font-mono text-base text-muted-foreground/40 whitespace-nowrap hover:text-primary transition-colors duration-300"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
