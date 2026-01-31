"use client";

import React, { useState } from "react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  // Extract text content from children (which is typically a <code> element)
  const extractText = (node: any): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props && node.props.children) return extractText(node.props.children);
    return "";
  };

  const handleCopy = () => {
    const text = extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-ink/10 bg-ink/5">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="bg-paper border border-ink/20 px-2 py-1 text-xs rounded shadow-sm hover:bg-paper-2 active:scale-95 transition-all text-ink/60"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!mt-0 !mb-0 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        {children}
      </pre>
    </div>
  );
}
