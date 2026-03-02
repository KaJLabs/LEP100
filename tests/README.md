# LEP100 Conformance Test Suite (1–14)

This repository provides a unified conformance suite for:
- LEP100-1  Lithic Core
- LEP100-2  AI Provider Standard
- LEP100-3  Budget & Cost Accounting
- LEP100-4  Provenance Receipts
- LEP100-5  zk-verifiable AI execution
- LEP100-6  NFT
- LEP100-7  Composable NFTs
- LEP100-8  Shared NFT Ownership
- LEP100-9  Multi-Token
- LEP100-10 Royalty
- LEP100-11 Metadata
- LEP100-12 Marketplace Hooks
- LEP100-13 Bridge Interface
- LEP100-14 Privacy-Preserving Account Linking (PPAL)

## Running
Local:
  lithc test ./lep100-tests --network local --report junit

Makalu:
  lithc test ./lep100-tests --network makalu --report junit

Mainnet:
  lithc test ./lep100-tests --network mainnet --report junit

## Notes
- This suite tests observable behavior via standard ABIs/events/errors.
- Golden vectors are placed under vectors/ and can be strengthened once encoding rules are frozen.
