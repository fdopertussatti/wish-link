import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    DISABLE_AUTH: process.env.DISABLE_AUTH,
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env),
  });
} 