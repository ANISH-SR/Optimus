"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Shield, Wallet, Lock, Activity, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TradingViewWidget from "@/components/trade/trading-view-widget";

export default function TradePage() {
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<"long" | "short">("long");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [orderState, setOrderState] = useState<"idle" | "generating_proof" | "submitting" | "done">("idle");
  const [activeTab, setActiveTab] = useState<"positions" | "orders" | "history">("positions");
  const [showSettings, setShowSettings] = useState(false);

  type Position = { id: string; market: string; side: "long"|"short"; size: string; leverage: number; commitment: string };
  const [positions, setPositions] = useState<Position[]>([
    { id: "1", market: "BTC-PERP", side: "long", size: "1.50", leverage: 10, commitment: "0x7f...a1b2" }
  ]);

  const handleTrade = () => {
    if (!isWalletConnected || !amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    setOrderState("generating_proof");
    setTimeout(() => {
      setOrderState("submitting");
      setTimeout(() => {
        setOrderState("done");
        
        // Add new position dynamically
        const newPos: Position = {
          id: Math.random().toString(),
          market: "BTC-PERP",
          side,
          size: amount,
          leverage,
          commitment: `0x${Math.floor(Math.random()*16777215).toString(16)}...${Math.floor(Math.random()*16777215).toString(16)}`
        };
        setPositions(prev => [newPos, ...prev]);
        setAmount("");
        
        setTimeout(() => setOrderState("idle"), 2000);
      }, 1500);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col text-sm text-foreground overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded border border-primary/40 flex items-center justify-center bg-primary/10">
              <Shield className="w-3 h-3 text-primary" />
            </div>
            <span className="font-display font-medium tracking-tight text-lg">ZeroPerp</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 font-mono text-xs border border-border rounded bg-background px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1" />
            Solana Devnet
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className={`text-muted-foreground hover:text-foreground ${showSettings ? "bg-muted" : ""}`} onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4" />
            </Button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded shadow-xl py-2 z-50 font-mono text-xs">
                <div className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => setShowSettings(false)}>Slippage Tolerance</div>
                <div className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => setShowSettings(false)}>RPC Node Settings</div>
                <div className="px-4 py-2 text-destructive hover:bg-destructive/10 cursor-pointer border-t border-border mt-2 pt-3" onClick={() => { setIsWalletConnected(false); setShowSettings(false); }}>Disconnect Wallet</div>
              </div>
            )}
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs h-8 px-4 rounded glow-green"
            onClick={() => setIsWalletConnected(!isWalletConnected)}
          >
            {isWalletConnected ? "3xKf...m9p2" : (
              <span className="flex items-center gap-2">
                <Wallet className="w-3 h-3" /> Connect Wallet
              </span>
            )}
          </Button>
        </div>
      </nav>

      {/* Main Trade Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column - Chart & Positions */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border">
          {/* Ticker Strip */}
          <div className="h-12 border-b border-border bg-background flex items-center px-4 gap-6 shrink-0 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">BTC-PERP</span>
              <span className="font-mono text-muted-foreground text-xs bg-muted px-1.5 rounded">100x</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-mono">Oracle Price</span>
              <span className="font-mono text-primary font-medium">$67,420.50</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-mono">24h Change</span>
              <span className="font-mono text-primary">+2.34%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-mono">Funding</span>
              <span className="font-mono text-yellow-500">0.0014%</span>
            </div>
            <div className="flex flex-col ml-auto">
              <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" /> Solvency
              </span>
              <span className="font-mono text-primary">Verified ✓</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="flex-1 bg-card relative min-h-[400px]">
            <TradingViewWidget />
          </div>

          {/* Positions Area */}
          <div className="h-64 border-t border-border bg-background flex flex-col shrink-0">
            <div className="h-10 border-b border-border flex items-center px-4 bg-card shrink-0 gap-2">
              <button 
                onClick={() => setActiveTab("positions")}
                className={`h-full px-2 font-mono text-xs transition-colors ${activeTab === "positions" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>
                Your Positions
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`h-full px-2 font-mono text-xs transition-colors ${activeTab === "orders" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>
                Orders
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`h-full px-2 font-mono text-xs transition-colors ${activeTab === "history" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>
                History
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {!isWalletConnected ? (
                <div className="h-full flex items-center justify-center text-muted-foreground font-mono text-xs">
                  Connect wallet to view private data
                </div>
              ) : activeTab === "orders" ? (
                <div className="text-muted-foreground font-mono text-xs">No active limit orders.</div>
              ) : activeTab === "history" ? (
                <div className="text-muted-foreground font-mono text-xs">No trade history available yet.</div>
              ) : positions.length === 0 ? (
                <div className="text-muted-foreground font-mono text-xs">No open positions.</div>
              ) : (
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="pb-2 font-normal">Market</th>
                      <th className="pb-2 font-normal">Side</th>
                      <th className="pb-2 font-normal text-right">Size</th>
                      <th className="pb-2 font-normal text-right">Leverage</th>
                      <th className="pb-2 font-normal text-right">Commitment (ZK)</th>
                      <th className="pb-2 font-normal text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos) => (
                      <tr key={pos.id} className="border-b border-border/50 group hover:bg-card/50 transition-colors">
                        <td className="py-3">{pos.market}</td>
                        <td className="py-3">
                          <span className={`px-1.5 rounded ${pos.side === "long" ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10"}`}>
                            {pos.side.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="blur-sm group-hover:blur-none transition-all select-none">{pos.size}</span>
                          <Lock className="w-3 h-3 inline ml-1 text-muted-foreground group-hover:hidden" />
                        </td>
                        <td className="py-3 text-right">{pos.leverage}x</td>
                        <td className="py-3 text-right text-muted-foreground truncate max-w-[100px]">{pos.commitment}</td>
                        <td className="py-3 text-right">
                          <button 
                            className="text-destructive hover:underline"
                            onClick={() => setPositions(positions.filter(p => p.id !== pos.id))}
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Order Panel */}
        <div className="w-full lg:w-80 bg-card flex flex-col shrink-0 z-10 shadow-xl border-l border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-mono font-medium">Place Order</span>
            <div className="flex gap-1 bg-background rounded p-0.5 border border-border">
              <button className="px-3 py-1 rounded bg-card text-foreground font-mono text-xs shadow-sm">Cross</button>
              <button className="px-3 py-1 rounded text-muted-foreground font-mono text-xs hover:text-foreground">Isolated</button>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-auto space-y-6">
            
            {/* Long / Short Toggle */}
            <div className="flex gap-2">
              <button 
                onClick={() => setSide("long")}
                className={`flex-1 py-2 font-mono text-sm font-medium rounded border transition-colors ${
                  side === "long" 
                    ? "bg-primary/10 border-primary text-primary" 
                    : "border-border text-muted-foreground hover:bg-background"
                }`}
              >
                LONG
              </button>
              <button 
                onClick={() => setSide("short")}
                className={`flex-1 py-2 font-mono text-sm font-medium rounded border transition-colors ${
                  side === "short" 
                    ? "bg-destructive/10 border-destructive text-destructive" 
                    : "border-border text-muted-foreground hover:bg-background"
                }`}
              >
                SHORT
              </button>
            </div>

            {/* Order Type */}
            <div className="flex items-center justify-between border border-border rounded p-1 bg-background">
              {["Market", "Limit", "Stop"].map(type => (
                <button 
                  key={type}
                  className={`flex-1 py-1 text-xs font-mono rounded ${type === "Market" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Size Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Size</span>
                <span>Margin: {isWalletConnected ? "$10,000.00" : "$0.00"}</span>
              </div>
              <div className="relative">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-background border border-border rounded px-3 py-3 font-mono focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute right-3 top-3.5 text-muted-foreground font-mono text-xs">USDC</span>
              </div>
            </div>

            {/* Leverage Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">Leverage</span>
                <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{leverage}x</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
                <span>1x</span>
                <span>25x</span>
                <span>50x</span>
                <span>75x</span>
                <span>100x</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Est. Execution Price</span>
                <span>$67,420.50</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Liquidation Price</span>
                <span>{side === "long" ? "$60,678.45" : "$74,162.55"}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground flex items-center gap-1">
                  ZK Proof Gen <Activity className="w-3 h-3" />
                </span>
                <span className="text-primary">Client-side (WASM)</span>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="p-4 border-t border-border bg-card">
            <Button 
              className={`w-full h-12 font-mono font-bold tracking-wider relative overflow-hidden transition-all ${
                !isWalletConnected ? "bg-muted text-muted-foreground hover:bg-muted" :
                side === "long" ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-green" : 
                "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }`}
              onClick={handleTrade}
              disabled={!isWalletConnected || orderState !== "idle"}
            >
              {/* Animation overlays */}
              {orderState !== "idle" && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                  {orderState === "generating_proof" && <span className="animate-pulse flex items-center gap-2"><Lock className="w-4 h-4"/> Generating ZK Proof...</span>}
                  {orderState === "submitting" && <span className="animate-pulse flex items-center gap-2"><Activity className="w-4 h-4"/> Confirming Tx...</span>}
                  {orderState === "done" && <span className="text-primary flex items-center gap-2">Success ✓</span>}
                </div>
              )}
              
              {/* Default Text */}
              <span className={orderState !== "idle" ? "opacity-0" : "opacity-100 transition-opacity"}>
                {!isWalletConnected ? "CONNECT WALLET" : `${side === "long" ? "LONG" : "SHORT"} BTC`}
              </span>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
