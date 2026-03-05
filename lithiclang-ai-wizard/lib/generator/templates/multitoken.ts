import type { WizardConfig } from "../schema";
import { header, requiresLines } from "./common";

export function genMultiToken(cfg: WizardConfig) {
  const useMeta = !!cfg.features.metadataL11;

  const imports = [
    "use LSCL::Assets::MultiToken",
    useMeta ? "use LSCL::Metadata" : null,
  ].filter(Boolean).join("\n");

  const stateLines = [
    "mt: MultiToken.MTStorage",
    useMeta ? "meta: Metadata.MetadataStorage" : null,
  ].filter(Boolean).join("\n    ");

  return `${header()}${requiresLines(cfg)}

${imports}

contract ${cfg.contractName} {
  state {
    ${stateLines}
  }

  constructor(base_uri: string) {
    ${useMeta ? "self.meta.base_uri_template = base_uri" : "// metadata disabled"}
  }

  // LEP100-9 (subset)
  public fn set_approval_for_all(operator: address, approved: bool) {
    MultiToken.set_approval_for_all(self.mt, operator, approved)
  }

  public fn mint(to: address, id: u256, amount: u256) {
    MultiToken.mint(self.mt, to, id, amount)
  }

  public fn safe_batch_transfer_from(from: address, to: address, ids: u256[], amts: u256[]) {
    MultiToken.safe_batch_transfer_from(self.mt, from, to, ids, amts).unwrap()
  }

  ${useMeta ? `public fn uri(id: u256) -> string { return Metadata.uri(self.meta, id).unwrap() }` : ""}
}
`;
}
