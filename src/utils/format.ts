/**
 * Formata um número como preço em real brasileiro (R$)
 * @param price - Valor para formatar
 * @returns String formatada (ex: R$ 199,90)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Formata uma data como string legível em português
 * @param timestamp - Timestamp em milissegundos
 * @returns Data formatada (ex: 21 de Junho de 2023)
 */
export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp));
}

/**
 * Formata um texto longo, adicionando reticências se necessário
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo
 * @returns Texto truncado com reticências
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
} 