import type { WizardConfig } from "../schema";
import { header, requiresLines } from "./common";

export function genNft(cfg: WizardConfig) {
  const useMeta = !!cfg.features.metadataL11;
  const useRoyalty = !!cfg.features.royaltyL10;
  const useHooks = !!cfg.features.marketplaceHooksL12;

  const imports = [
    "use LSCL::Assets::NFT",
    useMeta ? "use LSCL::Metadata" : null,
    useRoyalty ? "use LSCL::Royalty" : null,
    useHooks ? "use LSCL::MarketplaceHooks" : null,
  ].filter(Boolean).join("\n");

  const stateLines = [
    "nft: NFT.NFTStorage",
    useMeta ? "meta: Metadata.MetadataStorage" : null,
    useRoyalty ? "royalty_recipient: address" : null,
    useRoyalty ? "royalty_bps: u16" : null,
    useHooks ? "hooks: address" : null,
  ].filter(Boolean).join("\n    ");

  const ctorArgs = [
    useMeta ? "base_uri: string" : null,
    useRoyalty ? "recipient: address" : null,
    useRoyalty ? "bps: u16" : null,
    useHooks ? "hooks: address" : null,
  ].filter(Boolean).join(", ");

  const ctorBody = [
    useMeta ? "self.meta.base_uri_template = base_uri" : null,
    useRoyalty ? "self.royalty_recipient = recipient" : null,
    useRoyalty ? "self.royalty_bps = bps" : null,
    useHooks ? "self.hooks = hooks" : null,
  ].filter(Boolean).join("\n    ");

  return `${header()}${requiresLines(cfg)}

${imports}

contract ${cfg.contractName} {
  state {
    ${stateLines}
  }

  constructor(${ctorArgs}) {
    ${ctorBody}
  }

  // LEP100-6
  public fn mint(to: address, id: u256) {
    NFT.mint(self.nft, to, id).unwrap()
  }

  public fn approve(to: address, id: u256) {
    NFT.approve(self.nft, to, id).unwrap()
  }

  public fn transfer(from: address, to: address, id: u256) {
    NFT.transfer(self.nft, from, to, id).unwrap()
  }

  ${useMeta ? `// LEP100-11\n  public fn token_uri(id: u256) -> string { return Metadata.uri(self.meta, id).unwrap() }` : ""}

  ${useRoyalty ? `// LEP100-10\n  public fn royalty_info(token_id: u256, sale_price: u256) -> (address, u256) {\n    let amt = (sale_price * (self.royalty_bps as u256)) / 10000\n    return (self.royalty_recipient, amt)\n  }` : ""}

  ${useHooks ? `// LEP100-12\n  public fn set_hooks(h: address) { self.hooks = h }` : ""}
}
`;
}
