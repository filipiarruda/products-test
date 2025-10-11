export const toCurrency = (value: number, locale: string = 'pt-BR', currency: string = 'BRL'): string => {
    if (typeof value !== 'number' || isNaN(value)) return '-';
    const formatValue = (value / 100);
    return formatValue.toLocaleString(locale, { style: 'currency', currency });
}