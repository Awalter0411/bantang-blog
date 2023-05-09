import { NextResponse } from 'next/server';
import fs from 'fs'
import path from 'path';
import { marked } from 'marked'
import matter from 'gray-matter';

export async function GET(request: Request) {
  const content = fs.readFileSync(path.resolve('public/contents/home.md'), { encoding: 'utf-8' })
  const { content: contentStr, data } = matter(content, { excerpt: true })
  return NextResponse.json({ content: marked.parse(contentStr), info: data });
}