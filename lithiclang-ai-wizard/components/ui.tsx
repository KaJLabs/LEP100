import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  const { className = "", variant = "primary", ...rest } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : variant === "outline"
        ? "border border-border bg-transparent hover:bg-white/5"
        : "bg-transparent hover:bg-white/5";
  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-border bg-panel ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 border-b border-border ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`text-sm font-semibold ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 ${className}`} {...props} />;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`w-full rounded-xl border border-border bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40 ${className}`}
      {...rest}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", ...rest } = props;
  return (
    <select
      className={`w-full rounded-xl border border-border bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/40 ${className}`}
      {...rest}
    />
  );
}

export function ToggleRow({ label, desc, checked, onChange }: {label: string; desc?: string; checked: boolean; onChange: (v: boolean)=>void}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-xl border border-border bg-black/20 p-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {desc ? <div className="mt-1 text-xs text-muted">{desc}</div> : null}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e)=>onChange(e.target.checked)}
        className="mt-1 h-5 w-5 accent-[rgb(170_120_255)]"
      />
    </label>
  );
}

export function CodePane({ code }: {code: string}) {
  return (
    <pre className="rounded-2xl border border-border bg-black/40 p-4 text-xs leading-relaxed overflow-auto">
      <code>{code}</code>
    </pre>
  );
}
