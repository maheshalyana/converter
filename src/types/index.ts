export type CurrenciesResponse = {
  [key: string]: string; // e.g., "USD": "United States Dollar"
};

export type ExchangeRatesResponse = {
  amount: number;
  base: string; // Base currency code
  date: string; // Date of rates, e.g., "2023-11-24"
  rates: {
    [key: string]: number; // e.g., "EUR": 0.91873
  };
};
