"use client";

import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing script to prevent duplicates during hot reloads
    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      document.head.appendChild(script);
    }

    const initWidget = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView && container.current) {
        // Clear container before initializing to prevent duplicates
        container.current.innerHTML = '';
        
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSD",
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          backgroundColor: "#000000", // Matches our dark theme background
          gridColor: "#1a1a1a", // Matches our subtle borders
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: container.current.id,
          toolbar_bg: "#000000",
          studies: [
            "Volume@tv-basicstudies"
          ],
        });
      }
    };

    script.addEventListener('load', initWidget);
    
    // If script is already loaded, init immediately
    if ((window as any).TradingView) {
      initWidget();
    }

    return () => {
      script.removeEventListener('load', initWidget);
    };
  }, []);

  return (
    <div className="w-full h-full relative" id="tv_chart_container" ref={container}>
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm">
        Loading Chart...
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
