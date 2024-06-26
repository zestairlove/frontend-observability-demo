export interface Product {
  id: string;
  name: string;
  description: string;
  picture: string;
  priceUsd: Money | undefined;
  categories: string[];
}

export interface Empty {}

export interface Money {
  currencyCode: string;
  units: number;
  nanos: number;
}
