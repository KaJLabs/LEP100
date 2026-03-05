import type { WizardConfig } from "../schema";
import { header, requiresLines, addrOrZero } from "./common";

export function genWrappedBridge(cfg: WizardConfig) {
  const bridgeId = cfg.bridge?.bridgeIdHex?.trim() || "0x0";
  const verifier = addrOrZero(cfg.bridge?.verifierAddress);

  return `${header()}${requiresLines(cfg)}

use LSCL::Bridge

contract ${cfg.contractName} {
  state {
    b: Bridge.BridgeStorage
    bal: map[address]u256
  }

  constructor() {
    self.b.bridge_id = ${bridgeId}
    self.b.verifier = ${verifier}
    self.b.supported = map[u32]bool{}
    self.b.consumed = map[bytes32]bool{}
  }

  public fn set_supported(chain_id: u32, yes: bool) {
    Bridge.set_supported_chain(self.b, chain_id, yes)
  }

  public fn bridge_mint(
    to: address,
    amount: u256,
    src_chain_id: u32,
    src_tx_hash: bytes32,
    message_id: bytes32,
    proof: bytes
  ) {
    Bridge.bridge_mint_common(self.b, to, amount, src_chain_id, src_tx_hash, message_id, proof).unwrap()
    self.bal.set(to, self.bal.get(to).unwrap_or(0) + amount)
  }

  public fn bridge_burn(amount: u256, dst_chain_id: u32, nonce: u256) -> Bridge.BurnIntent {
    require(self.bal.get(caller).unwrap_or(0) >= amount, "insufficient")
    self.bal.set(caller, self.bal.get(caller) - amount)
    return Bridge.bridge_burn_common(self.b, caller, amount, dst_chain_id, 0, nonce).unwrap()
  }
}
`;
}
