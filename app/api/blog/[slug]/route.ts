import { NextResponse } from "next/server";
import { findFile, parseMarkdown } from "@/utils";
import readingTime from "reading-time";
import { marked } from "marked";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  },
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  console.log(slug);
  const content = await findFile('contents', params.slug)
  const { content: str, data } = parseMarkdown(content)
  return NextResponse.json({ content: marked(str), ...data, time: readingTime(str).text });
}