import { NextRequest, NextResponse } from 'next/server';

// Tipo para os dados de desempenho
type PerformanceData = {
  url: string;
  userAgent: string;
  timestamp: number;
  metrics: {
    [key: string]: number;
  };
  connection?: {
    effectiveType?: string;
    rtt?: number;
    downlink?: number;
  };
};

// Aqui poderíamos armazenar em um banco de dados real
const performanceLogs: PerformanceData[] = [];

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json();
    
    // Validação básica dos dados
    if (!data.url || !data.timestamp || !data.metrics) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Em produção: enviar para um banco de dados ou serviço analítico
    if (process.env.NODE_ENV === 'production') {
      // Aqui conectaria com um serviço real como Google Analytics, CloudWatch, etc.
      console.log('Performance data received:', data);
    } else {
      // Para desenvolvimento, apenas armazenamos em memória
      performanceLogs.push(data);
      console.log(`Performance data stored. Total logs: ${performanceLogs.length}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing performance data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

// Rota GET para visualizar métricas (apenas em desenvolvimento)
export async function GET() {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ logs: performanceLogs });
  }
  
  return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
} 