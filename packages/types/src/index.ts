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

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}
