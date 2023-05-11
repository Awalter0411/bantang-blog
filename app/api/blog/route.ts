import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import readingTime from 'reading-time'
import { parseMarkdown, readDirRecursive } from '@/utils';
import os from 'os'

export async function GET(request: Request) {
  const blogPaths: string[] = [];
  const blogData = []
  await readDirRecursive(blogPaths, 'public/contents/blog')
  for (const p of blogPaths) {
    const { content, data } = parseMarkdown(await fs.readFile(p, { encoding: 'utf-8' }))
    if (os.platform() === 'win32') {
      blogData.push({
        ...data, filename: p.substring(p.lastIndexOf('\\') + 1), time: readingTime(content).text
      })
    } else {
      blogData.push({
        ...data, filename: p.substring(p.lastIndexOf('/') + 1), time: readingTime(content).text
      })
    }
  }
  return NextResponse.json({ list: blogData });
}