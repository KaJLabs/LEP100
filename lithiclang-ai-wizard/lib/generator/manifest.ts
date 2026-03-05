import type { WizardConfig } from "./schema";

export function buildManifest(cfg: WizardConfig) {
  const requiredLeps: string[] = ["LEP100-1"];

  if (cfg.contractType === "AI_APP_L2_5") {
    requiredLeps.push("LEP100-2", "LEP100-3", "LEP100-4");
    if (cfg.features.zkL5) requiredLeps.push("LEP100-5");
    if (cfg.features.ppalL14) requiredLeps.push("LEP100-14");
  } else {
    if (cfg.contractType === "NFT_L6") requiredLeps.push("LEP100-6");
    if (cfg.contractType === "MULTITOKEN_L9") requiredLeps.push("LEP100-9");
    if (cfg.contractType === "WRAPPED_BRIDGE_L13") requiredLeps.push("LEP100-13");
    if (cfg.features.metadataL11) requiredLeps.push("LEP100-11");
    if (cfg.features.royaltyL10) requiredLeps.push("LEP100-10");
    if (cfg.features.marketplaceHooksL12) requiredLeps.push("LEP100-12");
    if (cfg.features.bridgeL13) requiredLeps.push("LEP100-13");
    if (cfg.features.ppalL14) requiredLeps.push("LEP100-14");
  }

  return {
    name: cfg.contractName,
    contractType: cfg.contractType,
    accessModel: cfg.accessModel,
    requiredLeps: Array.from(new Set(requiredLeps)),
    generatedAt: new Date().toISOString(),
    website: "https://lithiclang.ai",
    credits: "Proposed by J. King Kasr • KaJ Labs",
  };
}
