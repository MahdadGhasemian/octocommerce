// utils/priceFormatter.ts

export const formatPrice = (number: number, locale = 'fa-IR'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(number);
};

export function formatPriceToman(number: number, locale = 'fa-IR') {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'decimal',
  });

  return `${formatCurrency.format(number)} تومان`;
}
