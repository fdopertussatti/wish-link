'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Tipos para as métricas
type WebVitalsMetric = {
  id: string;
  name: string;
  value: number;
};

// Função para reportar métricas
function sendMetrics(metric: WebVitalsMetric) {
  // Verifica se está no cliente
  if (typeof window === 'undefined') return;

  // Coleta dados adicionais
  const data = {
    url: window.location.href,
    userAgent: window.navigator.userAgent,
    timestamp: Date.now(),
    metrics: {
      [metric.name]: metric.value,
    },
    connection: 'connection' in navigator ? {
      // @ts-ignore - Tipo não está disponível em todos os navegadores
      effectiveType: navigator.connection?.effectiveType,
      // @ts-ignore
      rtt: navigator.connection?.rtt,
      // @ts-ignore
      downlink: navigator.connection?.downlink,
    } : undefined,
  };

  // Envia para a API
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    // Usa sendBeacon para não bloquear a navegação
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/performance', blob);
    } else {
      // Fallback para fetch
      fetch('/api/performance', {
        method: 'POST',
        body: blob,
        keepalive: true,
      });
    }
  } catch (error) {
    console.error('Failed to send performance metrics:', error);
  }
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Inicializa monitoramento apenas em produção ou com flag específica
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_MONITOR_PERFORMANCE === 'true') {
      // Core Web Vitals
      onCLS(sendMetrics);
      onFID(sendMetrics);
      onLCP(sendMetrics);
      
      // Métricas adicionais
      onFCP(sendMetrics);
      onTTFB(sendMetrics);
    }
  }, []);

  // Este componente não renderiza nada
  return null;
} 