import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dreamsDirectory = path.join(process.cwd(), 'content/dreams-md');

export interface Dream {
  slug: string;
  title: string;
  date: string;
  content: string;
  vibe?: string;
}

export function getAllDreams(): Dream[] {
  if (!fs.existsSync(dreamsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(dreamsDirectory);
  const allDreamsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dreamsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        vibe: data.vibe || '👾',
        content,
      };
    });

  return allDreamsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getDreamBySlug(slug: string): Dream | null {
  const fullPath = path.join(dreamsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    vibe: data.vibe || '👾',
    content,
  };
}
