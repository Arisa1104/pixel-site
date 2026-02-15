import fs from 'fs';
import path from 'path';

export function getBoardData() {
  const boardPath = path.join(process.cwd(), 'content/board/BOARD.md');
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
    console.error("Failed to read board at", boardPath, e);
    return null;
  }
}
