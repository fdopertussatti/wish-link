import { NextResponse } from 'next/server';

export async function GET() {
  // Verificar se a autenticação está desabilitada via variável de ambiente
  const isAuthDisabled = process.env.DISABLE_AUTH === 'true';
  
  return NextResponse.json({ 
    disabled: isAuthDisabled 
  });
} 