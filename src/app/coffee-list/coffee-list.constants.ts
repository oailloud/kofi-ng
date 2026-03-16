
export type SORTING = 'price-asc' | 'price-desc' | 'name';

export const SORTING_LABELS: Record<SORTING, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name': 'Name',
} as const;
