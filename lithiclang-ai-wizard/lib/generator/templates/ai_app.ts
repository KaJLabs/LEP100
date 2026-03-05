import type { WizardConfig } from "../schema";
import { header, requiresLines } from "./common";

export function genAiApp(cfg: WizardConfig) {
  const serviceName = cfg.ai?.serviceName?.trim() || "AIService";
  const endpoint = cfg.ai?.endpoint?.trim() || "agii://provider/default/model";
  const maxCost = cfg.ai?.maxCost?.trim() || "10 LITHO";
  const timeoutBlocks = cfg.ai?.timeoutBlocks || 20;

  const imports = [
    cfg.features.budgetsL3 ? "use LSCL::AI::Budget" : null,
    cfg.features.receiptsL4 ? "use LSCL::AI::Receipts" : null,
    cfg.features.zkL5 ? "use LSCL::AI::ZKExecution" : null,
    cfg.features.ppalL14 ? "use LSCL::PPAL" : null,
  ].filter(Boolean).join("\n");

  const stateLines = [
    "last_output: string",
    cfg.features.budgetsL3 ? "budget_cfg: Budget.BudgetConfig\n    budget_state: Budget.BudgetState" : null,
    cfg.features.ppalL14 ? "ppal: PPAL.PPALStorage" : null,
  ].filter(Boolean).join("\n    ");

  const budgetInit = cfg.features.budgetsL3 ? `
    self.budget_cfg.max_per_call = 10
    self.budget_cfg.max_per_user = 100
    self.budget_cfg.epoch_blocks = 7200
    self.budget_state.spent_by_user_epoch = map[address]map[u64]u256{}` : "";

  return `${header()}${requiresLines(cfg)}

${imports}

contract ${cfg.contractName} {
  state {
    ${stateLines}
  }

  ai.service ${serviceName} {
    endpoint: "${endpoint}"
    max_cost: ${maxCost}${cfg.features.zkL5 ? "\n    zk_required: true" : ""}
  }

  constructor() {
    ${budgetInit}
  }

  public fn run(prompt: string) {
    ${cfg.features.budgetsL3 ? "Budget.enforce_user_budget(self.budget_cfg, self.budget_state, caller, 1).unwrap()" : ""}

    let req = ai.request ${serviceName} {
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 512
    }

    ai.fulfill(req) |resp| {
      self.last_output = resp.text
    }
    .timeout(${timeoutBlocks} blocks)
    .on_timeout { revert("AI timeout") }
  }
}
`;
}
