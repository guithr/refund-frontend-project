/**
 * debounce
 *
 * Retorna uma versão "atrasada" da função original.
 * A função só será executada após o tempo (wait)
 * passar sem que ela seja chamada novamente.
 *
 * @param func Função que será executada
 * @param wait Tempo em milissegundos
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    // Se já existe um timer rodando, cancela ele
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    // Cria um novo timer
    timeout = setTimeout(later, wait);
  };
}
