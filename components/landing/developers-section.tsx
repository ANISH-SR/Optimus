"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Install",
    code: `# Install ZeroPerp SDK + Anchor
npm install @zeroperp/sdk @coral-xyz/anchor

# Install circuit dependencies  
npm install snarkjs circomlibjs`,
  },
  {
    label: "Open Position",
    code: `import { ZeroPerp } from '@zeroperp/sdk'
import { useAnchorWallet } from '@solana/wallet-adapter-react'

const wallet = useAnchorWallet()
const zp = new ZeroPerp({ wallet, cluster: 'devnet' })

// Generate ZK commitment (client-side)
const { commitment, secret } = await zp.createCommitment({
  pair: 'BTC-PERP',
  size: 0.5,       // BTC
  direction: 'long',
  leverage: 10,
})

// Submit commitment on-chain
const tx = await zp.openPosition(commitment)
// Tx: 3xKf...m9p2 — position hidden ✓`,
  },
  {
    label: "ZK Proof",
    code: `// Generate liquidation range proof
const proof = await zp.generateProof('liquidation', {
  commitment,
  secret,
  oraclePrice: await zp.getPrice('BTC-PERP'),
  marginRatio: 0.05,  // below threshold
})

// Verify proof on-chain (Anchor)
const tx = await zp.submitProof(proof)

// Output: {
//   verified: true,
//   liquidated: true, 
//   positionRevealed: false  // ← still private!
// }`,
  },
];

const sdkFeatures = [
  { 
    title: "WASM proof gen", 
    description: "Client-side Groth16 proof generation in <2s."
  },
  { 
    title: "Anchor IDL", 
    description: "Full TypeScript types from on-chain IDL."
  },
  { 
    title: "Pyth integration", 
    description: "Real-time oracle prices, no centralized feeds."
  },
  { 
    title: "React hooks", 
    description: "usePosition, useOrderbook, useCommitment."
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              For developers
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Integrate in
              <br />
              <span className="text-muted-foreground">minutes, not days.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              A TypeScript SDK that abstracts ZK proof generation and Anchor interactions.
              All cryptography runs client-side in WASM — no servers needed.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {sdkFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-mono text-sm font-medium mb-1 text-primary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center border-b border-border bg-card">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    id={`dev-tab-${idx}`}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${
                      activeTab === idx
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Copy code"
                  id="dev-copy-btn"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm bg-background min-h-[280px] zk-scanline">
                <pre className="text-foreground/80">
                  {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeTab}-${lineIndex}`} 
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 60}ms` }}
                    >
                      <span className="inline-flex flex-wrap">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className="dev-code-char"
                            style={{
                              animationDelay: `${lineIndex * 60 + charIndex * 8}ms`,
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
            </div>
            
            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm font-mono">
              <a href="#" className="text-primary hover:underline underline-offset-4">
                SDK Reference ↗
              </a>
              <span className="text-border">|</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
