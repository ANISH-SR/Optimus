# 🛡️ ZeroPerp

**Zero-Knowledge Perpetual DEX on Solana**

ZeroPerp is a high-performance, privacy-preserving decentralized exchange built on Solana. It utilizes Pedersen commitments and Groth16 zero-knowledge proofs to allow traders to open highly leveraged perpetual futures positions without publicly revealing their position size, direction, or liquidation price.

![ZeroPerp Dashboard Demo](./public/og-image.png)

## ✨ Key Features

- **ZK Position Hiding**: Your trade size, leverage (up to 100x), and direction (Long/Short) are cryptographically concealed on-chain using Pedersen commitments.
- **On-Chain Solvency Proofs**: The protocol publishes periodic Merkle-tree solvency proofs, guaranteeing collateralization without leaking individual user state.
- **MEV Resistance**: Because open positions are obscured in the Anchor program state, sandwiching and front-running liquidations become cryptographically impossible.
- **WASM Client-side Proving**: SNARK generation happens natively in the browser via WebAssembly, maintaining absolute privacy of your trade secrets.

---

## 🏗️ Architecture

The project is split into a monorepo containing a Next.js (App Router) frontend and a Solana Anchor smart contract backend.

1. **`/app` & `/components`**: The Next.js 15 React frontend, utilizing Tailwind CSS, Lucide Icons, and TradingView Lightweight charts for the DEX dashboard.
2. **`/zeroperp`**: The Rust-based Anchor smart contract program workspace containing the core logic for vault management, margin deposits, and ZK verifications.

### Smart Contract Flow
- `deposit_margin`: Users deposit SPL USDC or SOL into the PDA Vault.
- `open_position`: Users submit a `commitment` (a 32-byte hash) generated client-side instead of their raw trade data.
- `liquidate`: Liquidators submit a ZK range proof verifying that a given commitment is underwater based on current Pyth oracle data, without knowing the exact entry price.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Rust & Cargo
- Solana CLI & Anchor framework installed locally

### 1. Clone the repository
```bash
git clone https://github.com/ANISH-SR/Optimus.git
cd Optimus
```

### 2. Run the Next.js Frontend
Install dependencies and spin up the development server:

```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000` to view the landing page, and `http://localhost:3000/trade` to interact with the DEX interface.

### 3. Build the Anchor Smart Contracts
Navigate to the Anchor workspace and compile the Rust BPF programs:

```bash
cd zeroperp
cargo check
anchor build
```

To run a local validator and deploy the contracts for testing:
```bash
anchor localnet
```

---

## 🛠️ Built With
* [Next.js](https://nextjs.org/) - React Framework
* [Anchor](https://www.anchor-lang.com/) - Solana Sealevel Framework
* [Solana](https://solana.com/) - L1 Blockchain
* [Tailwind CSS](https://tailwindcss.com/) - Styling
* [TradingView](https://www.tradingview.com/) - Advanced Charting

## 📜 License
This project is licensed under the MIT License.
