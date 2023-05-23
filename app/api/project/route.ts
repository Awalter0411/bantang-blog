import { NextResponse } from 'next/server';
import fs from 'fs'
import path from 'path';

export async function GET(request: Request) {
  const data = fs.readFileSync(path.join('public/projects/data.json'), { encoding: 'utf-8' })
  return NextResponse.json({ ...JSON.parse(data) });
}