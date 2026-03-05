import { z } from "zod";

export const WizardConfigSchema = z.object({
  contractName: z.string().min(1).max(64).regex(/^[A-Za-z_][A-Za-z0-9_]*$/),
  contractType: z.enum(["NFT_L6", "MULTITOKEN_L9", "WRAPPED_BRIDGE_L13", "AI_APP_L2_5"]),
  accessModel: z.enum(["OWNER", "ROLES", "CAPABILITIES"]).default("CAPABILITIES"),
  features: z.object({
    metadataL11: z.boolean().optional().default(true),
    royaltyL10: z.boolean().optional().default(false),
    marketplaceHooksL12: z.boolean().optional().default(false),
    bridgeL13: z.boolean().optional().default(false),
    mintable: z.boolean().optional().default(true),
    burnable: z.boolean().optional().default(false),
    pausable: z.boolean().optional().default(false),
    batchOps: z.boolean().optional().default(true),
    budgetsL3: z.boolean().optional().default(true),
    receiptsL4: z.boolean().optional().default(true),
    zkL5: z.boolean().optional().default(false),
    ppalL14: z.boolean().optional().default(false),
  }).default({} as any),
  token: z.object({
    name: z.string().optional(),
    symbol: z.string().optional(),
    baseUriTemplate: z.string().optional(),
    defaultRoyaltyBps: z.number().int().min(0).max(10000).optional(),
    royaltyRecipient: z.string().optional(),
  }).default({} as any),
  bridge: z.object({
    bridgeIdHex: z.string().optional(),
    verifierAddress: z.string().optional(),
    supportedChainIds: z.array(z.number().int()).optional(),
  }).optional(),
  ai: z.object({
    serviceName: z.string().optional(),
    endpoint: z.string().optional(),
    maxCost: z.string().optional(),
    timeoutBlocks: z.number().int().min(1).max(10_000).optional(),
  }).optional(),
});

export type WizardConfig = z.infer<typeof WizardConfigSchema>;

export function safeParseConfig(input: unknown) {
  return WizardConfigSchema.safeParse(input);
}
