# LithicLang.ai — LEP100 Contracts Wizard (Lithic)

A Next.js (App Router) web app that generates **LEP100-compliant** `.lithic` contracts using a wizard UI,
similar in spirit to OpenZeppelin’s Contracts Wizard—tailored to **Lithic** + **LEP100** + **LSCL**.

## Features
- Contract templates:
  - LEP100-6 NFT (ERC-721-like)
  - LEP100-9 MultiToken (ERC-1155-like)
  - LEP100-13 Wrapped / Bridge Mint-Burn
  - AI App template (LEP100-2..5)
- Toggle add-ons:
  - LEP100-10 Royalties
  - LEP100-11 Metadata
  - LEP100-12 Marketplace Hooks
  - LEP100-5 zk-required (AI template)
  - LEP100-3 Budgets (AI template)
  - LEP100-4 Receipts (AI template)
  - LEP100-14 PPAL gate (optional)
- Live configuration preview
- Download as ZIP (contract + test stub + manifest)

## Tech
- Next.js (App Router) + TypeScript
- Tailwind (dark mode default)
- Zod for config validation
- JSZip for ZIP export

## Quickstart
```bash
pnpm i
pnpm dev
# open http://localhost:3000
```

## Deploy (lithiclang.ai)
- Recommended: Vercel
- Ensure Node.js 18+

© Lithosphere • KaJ Labs • Proposed by J. King Kasr
