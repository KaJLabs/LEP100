# LSCL (Lithosphere Secure Contracts Library) — LEP100-1..14 Reference Modules

This repository provides LSCL reference modules for the LEP100 asset + AI stack:
- LEP100-1  Lithic Core hooks (capabilities, async patterns)
- LEP100-2  AI Provider interface helpers
- LEP100-3  Budget & cost accounting guards
- LEP100-4  Provenance receipt hashing + verification adapters
- LEP100-5  zk-verifiable AI execution adapters
- LEP100-6  NFT (ERC-721-like) reference patterns
- LEP100-7  Composable NFTs (NFT owns assets)
- LEP100-8  Shared NFT ownership (vault + shares)
- LEP100-9  Multi-token (ERC-1155-like) reference patterns
- LEP100-10 Royalty
- LEP100-11 Metadata
- LEP100-12 Marketplace Hooks
- LEP100-13 Bridge Mint/Burn common interface
- LEP100-14 PPAL (Privacy-Preserving Account Linking) helpers

## Notes
- Modules are written in `.lithic` and designed to compile to LithoVM.
- Some syscalls are represented as `sys.*` placeholders. Replace with your finalized LithoVM syscall surface.
- The goal is standardization: consistent ABIs, events, and error codes across contracts.

## Layout
- `lscl/` contains modules grouped by domain.
- `examples/` contains minimal contracts showing how to compose modules.

## License
Apache-2.0 (recommended)
