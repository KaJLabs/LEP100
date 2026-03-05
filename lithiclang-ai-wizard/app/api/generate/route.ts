import { NextResponse } from "next/server";
import JSZip from "jszip";
import { safeParseConfig } from "@/lib/generator/schema";
import { generate } from "@/lib/generator";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = safeParseConfig(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid config", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const out = generate(parsed.data);
  const zip = new JSZip();

  for (const [path, content] of Object.entries(out.files)) {
    zip.file(path, content);
  }

  const buf = await zip.generateAsync({ type: "nodebuffer" });
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${parsed.data.contractName}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
