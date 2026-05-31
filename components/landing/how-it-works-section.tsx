"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Connect wallet & deposit",
    description: "Connect your Phantom or Backpack wallet. Deposit SOL or USDC as margin into the ZeroPerp vault program. Your deposit is recorded on-chain as plain collateral.",
    code: `// Anchor program — deposit margin
pub fn deposit_margin(
  ctx: Context<DepositMargin>,
  amount: u64,
) -> Result<()> {
  let vault = &mut ctx.accounts.vault;
  vault.collateral += amount;
  
  // Transfer USDC to protocol vault
  token::transfer(ctx.accounts.into(), amount)?;
  Ok(())
}`,
  },
  {
    number: "II",
    title: "Generate ZK commitment",
    description: "Client-side, generate a Pedersen commitment to your position: commit(size, direction, secret). The commitment is submitted on-chain; no one can decode it without your secret.",
    code: `// Client — generate commitment (WASM)
const secret = crypto.randomBytes(32);
const position = {
  size: 1.5,        // BTC
  direction: 1,     // LONG
  leverage: 10,
};

const commitment = pedersen_commit(
  position,
  secret
);

// Publish commitment on-chain
await program.methods
  .openPosition(commitment)
  .rpc();`,
  },
  {
    number: "III",
    title: "ZK proof on liquidation",
    description: "When your position is undercollateralized, you (or a liquidator) generate a Groth16 range proof proving liquidatability without revealing your position. The proof is verified on-chain by the Anchor program.",
    code: `// Generate Groth16 range proof
const proof = await generateProof({
  circuit: "liquidation_check",
  inputs: {
    commitment,
    secret,
    oracle_price: 61420,
    margin:       0.08,   // under threshold
  }
});

// Submit proof → program verifies
await program.methods
  .liquidate(proof.proof, proof.publicInputs)
  .rpc();

// ✓ Liquidated without revealing size`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-card overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-sm opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            How ZK Works
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three steps.
            <br />
            <span className="text-muted-foreground">Zero knowledge.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-border transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-primary/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className={`text-2xl lg:text-3xl font-display mb-3 transition-colors duration-300 ${activeStep === index ? "text-primary" : "text-foreground"}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-border overflow-hidden">
                        <div 
                          className="h-full bg-primary w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-border rounded-lg overflow-hidden bg-background/50">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">zeroperp.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm min-h-[320px] zk-scanline">
                <pre className="text-foreground/70">
                  {steps[activeStep].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeStep}-${lineIndex}`} 
                      className="leading-loose code-line-reveal"
                      style={{ 
                        animationDelay: `${lineIndex * 80}ms`,
                      }}
                    >
                      <span className="text-muted-foreground/30 select-none w-8 inline-block">{lineIndex + 1}</span>
                      <span className="inline-flex flex-wrap">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 8}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-border flex items-center gap-3 bg-card">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Devnet • Program: ZrP1...a7f3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
