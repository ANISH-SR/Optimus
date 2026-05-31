"use client";

import { ArrowUpRight, Shield } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Protocol: [
    { name: "How ZK Works", href: "#how-it-works" },
    { name: "Solvency Proofs", href: "#protocol" },
    { name: "Liquidation Model", href: "#protocol" },
    { name: "Fee Structure", href: "#" },
  ],
  Developers: [
    { name: "Anchor Programs", href: "#developers" },
    { name: "SDK Reference", href: "#developers" },
    { name: "Devnet Faucet", href: "#" },
    { name: "Program IDs", href: "#" },
  ],
  Community: [
    { name: "Discord", href: "#" },
    { name: "Twitter / X", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Whitepaper", href: "#", badge: "PDF" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "Discord", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-border">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-10 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded border border-primary/40 flex items-center justify-center bg-primary/10">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-2xl font-display">
                  Zero<span className="text-primary">Perp</span>
                </span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs font-mono text-sm">
                Privacy-preserving perpetuals on Solana. Your positions are yours alone.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group font-mono"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-mono font-medium mb-6 text-primary/70">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 font-mono"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © 2025 ZeroPerp. Built for Sober30 Hackathon.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Solana Devnet • Program: ZrP1...a7f3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
