import fs from 'fs';
import path from 'path';

export function getBoardData() {
  const boardPath = '/home/openclaw/.openclaw/workspaces/shared/BOARD.md';
  try {
    const content = fs.readFileSync(boardPath, 'utf8');
    
    // Simple parsing logic
    const sections = content.split('## ').slice(1);
    const parsed: any = {};
    
    sections.forEach(section => {
      const lines = section.split('\n');
      const title = lines[0].trim();
      const body = lines.slice(1).join('\n').trim();
      parsed[title] = body;
    });

    return {
      content,
      parsed,
      lastUpdated: new Date().toISOString()
    };
  } catch (e) {
    console.error("Failed to read board", e);
    return null;
  }
}
