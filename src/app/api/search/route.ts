import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { glob } from "glob";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const workspaceRoot = path.join(process.cwd(), "..");
    
    // Search in memory files, root markdown files, and other relevant docs
    const files = await glob("**/*.md", { 
      cwd: workspaceRoot,
      ignore: ["**/node_modules/**", "**/pixel-site/.next/**", "**/pixel-site/node_modules/**"]
    });

    const results = [];

    for (const file of files) {
      const filePath = path.join(workspaceRoot, file);
      const content = await fs.readFile(filePath, "utf-8");
      
      if (content.toLowerCase().includes(query)) {
        // Find the matching context
        const lines = content.split("\n");
        const matchingLineIndex = lines.findIndex(line => line.toLowerCase().includes(query));
        const snippet = lines.slice(
          Math.max(0, matchingLineIndex - 1),
          Math.min(lines.length, matchingLineIndex + 2)
        ).join("\n");

        results.push({
          title: path.basename(file),
          path: file,
          snippet: snippet,
          type: file.includes("memory/") ? "memory" : "document",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
