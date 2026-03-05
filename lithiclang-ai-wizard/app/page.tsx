"use client";

import React, { useMemo, useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, CodePane, Input, Select, ToggleRow } from "@/components/ui";
import { Wand2, Download, Copy, ExternalLink } from "lucide-react";

type ContractType = "NFT_L6" | "MULTITOKEN_L9" | "WRAPPED_BRIDGE_L13" | "AI_APP_L2_5";

const DEFAULTS: any = {
  contractName: "MyContract",
  contractType: "NFT_L6" as ContractType,
  accessModel: "CAPABILITIES",
  features: {
    metadataL11: true,
    royaltyL10: false,
    marketplaceHooksL12: false,
    bridgeL13: false,
    budgetsL3: true,
    receiptsL4: true,
    zkL5: false,
    ppalL14: false,
  },
  token: {
    name: "My Collection",
    symbol: "MYNFT",
    baseUriTemplate: "ipfs://CID/{id}.json",
    defaultRoyaltyBps: 500,
    royaltyRecipient: "0x0",
  },
  bridge: {
    bridgeIdHex: "0x0",
    verifierAddress: "0x0",
    supportedChainIds: [1, 56, 777777],
  },
  ai: {
    serviceName: "GPT4",
    endpoint: "agii://provider42/gpt4",
    maxCost: "10 LITHO",
    timeoutBlocks: 20,
  },
};

async function postZip(cfg: any) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cfg),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e?.error || "Failed to generate");
  }
  return await res.blob();
}

export default function Page() {
  const [cfg, setCfg] = useState<any>(DEFAULTS);
  const [preview, setPreview] = useState<string>("// Configure options and click Generate preview.");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  const isAi = cfg.contractType === "AI_APP_L2_5";
  const isBridge = cfg.contractType === "WRAPPED_BRIDGE_L13";

  const toggles = useMemo(() => {
    return isAi
      ? [
          { k: "budgetsL3", l: "Budgets (LEP100-3)", d: "Per-user caps + epoch resets." },
          { k: "receiptsL4", l: "Receipts (LEP100-4)", d: "Provider signature receipt hooks." },
          { k: "zkL5", l: "zk-required (LEP100-5)", d: "Require zk proof binding." },
          { k: "ppalL14", l: "PPAL gate (LEP100-14)", d: "Privacy-preserving account linking gate." },
        ]
      : [
          { k: "metadataL11", l: "Metadata (LEP100-11)", d: "token_uri/uri templates." },
          { k: "royaltyL10", l: "Royalties (LEP100-10)", d: "royalty_info quoting." },
          { k: "marketplaceHooksL12", l: "Marketplace Hooks (LEP100-12)", d: "Optional callbacks." },
          { k: "bridgeL13", l: "Bridge Interface (LEP100-13)", d: "Mint/burn + replay protection." },
          { k: "ppalL14", l: "PPAL gate (LEP100-14)", d: "Privacy-preserving linking gate." },
        ];
  }, [isAi]);

  async function generatePreview() {
    setBusy(true);
    setErr("");
    try {
      await postZip(cfg);
      setPreview(
        [
          `// ZIP generated successfully.`,
          `// Download to inspect: src/${cfg.contractName}.lithic, tests/${cfg.contractName}.spec.lithic, lep100.json`,
          ``,
          `// Current config:`,
          JSON.stringify(cfg, null, 2),
        ].join("\n")
      );
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    setBusy(true);
    setErr("");
    try {
      const blob = await postZip(cfg);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cfg.contractName}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function copyPreview() {
    await navigator.clipboard.writeText(preview);
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl border border-border bg-panel flex items-center justify-center">
              <Wand2 className="h-4 w-4 text-brand" />
            </div>
            <div>
              <div className="text-sm font-semibold">Lithic Contracts Wizard</div>
              <div className="text-xs text-muted">LEP100 • Lithosphere • LithoVM</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => window.open("https://docs.lithosphere.network", "_blank")}>
              Docs <ExternalLink className="h-4 w-4" />
            </Button>
            <Button onClick={downloadZip} disabled={busy}>
              <Download className="h-4 w-4" /> Download ZIP
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Configure</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted mb-2">Contract name</div>
                <Input value={cfg.contractName} onChange={(e)=>setCfg({ ...cfg, contractName: e.target.value })} />
              </div>
              <div>
                <div className="text-xs text-muted mb-2">Contract type</div>
                <Select value={cfg.contractType} onChange={(e)=>setCfg({ ...cfg, contractType: e.target.value })}>
                  <option value="NFT_L6">LEP100-6 NFT</option>
                  <option value="MULTITOKEN_L9">LEP100-9 MultiToken</option>
                  <option value="WRAPPED_BRIDGE_L13">LEP100-13 Wrapped/Bridge</option>
                  <option value="AI_APP_L2_5">LEP100-2..5 AI App</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted">Features</div>
              <div className="space-y-2">
                {toggles.map((t) => (
                  <ToggleRow
                    key={t.k}
                    label={t.l}
                    desc={t.d}
                    checked={!!cfg.features[t.k]}
                    onChange={(v)=>setCfg({ ...cfg, features: { ...cfg.features, [t.k]: v } })}
                  />
                ))}
              </div>
            </div>

            {!isAi ? (
              <div className="space-y-3">
                <div className="text-xs text-muted">Token</div>
                <div className="grid grid-cols-2 gap-3">
                  <Input value={cfg.token.name} onChange={(e)=>setCfg({ ...cfg, token: { ...cfg.token, name: e.target.value } })} placeholder="Token name" />
                  <Input value={cfg.token.symbol} onChange={(e)=>setCfg({ ...cfg, token: { ...cfg.token, symbol: e.target.value } })} placeholder="Symbol" />
                </div>
                {cfg.features.metadataL11 ? (
                  <Input value={cfg.token.baseUriTemplate} onChange={(e)=>setCfg({ ...cfg, token: { ...cfg.token, baseUriTemplate: e.target.value } })} placeholder="Base URI template" />
                ) : null}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-muted">AI</div>
                <div className="grid grid-cols-2 gap-3">
                  <Input value={cfg.ai.serviceName} onChange={(e)=>setCfg({ ...cfg, ai: { ...cfg.ai, serviceName: e.target.value } })} placeholder="Service name" />
                  <Input value={cfg.ai.maxCost} onChange={(e)=>setCfg({ ...cfg, ai: { ...cfg.ai, maxCost: e.target.value } })} placeholder="Max cost (e.g. 10 LITHO)" />
                </div>
                <Input value={cfg.ai.endpoint} onChange={(e)=>setCfg({ ...cfg, ai: { ...cfg.ai, endpoint: e.target.value } })} placeholder="Endpoint" />
              </div>
            )}

            {(cfg.features.bridgeL13 || isBridge) ? (
              <div className="space-y-3">
                <div className="text-xs text-muted">Bridge</div>
                <div className="grid grid-cols-2 gap-3">
                  <Input value={cfg.bridge.bridgeIdHex} onChange={(e)=>setCfg({ ...cfg, bridge: { ...cfg.bridge, bridgeIdHex: e.target.value } })} placeholder="bridgeId (bytes32)" />
                  <Input value={cfg.bridge.verifierAddress} onChange={(e)=>setCfg({ ...cfg, bridge: { ...cfg.bridge, verifierAddress: e.target.value } })} placeholder="verifier addr" />
                </div>
              </div>
            ) : null}

            {err ? <div className="text-sm text-red-300">{err}</div> : null}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={generatePreview} disabled={busy}><Wand2 className="h-4 w-4" /> Generate preview</Button>
              <Button variant="outline" onClick={copyPreview} disabled={busy}><Copy className="h-4 w-4" /> Copy</Button>
            </div>

            <div className="text-xs text-muted">Proposed by <span className="text-white">J. King Kasr</span> • KaJ Labs</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Output</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs text-muted">Download the ZIP for generated `.lithic` source + test stub + LEP manifest.</div>
            <CodePane code={preview} />
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Lithosphere • LithicLang.ai Wizard</div>
          <div className="flex items-center gap-4">
            <a href="https://lithic.at" target="_blank">lithic.at</a>
            <a href="https://docs.lithosphere.network" target="_blank">docs</a>
            <a href="https://github.com/KaJLabs" target="_blank">github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
