"use client";

import { useQuery } from '@tanstack/react-query';
import type { CurrenciesResponse, ExchangeRatesResponse } from '@/types';

const FRANKFURTER_API_BASE = 'https://api.frankfurter.app';

// Fetch available currencies
const fetchCurrencies = async (): Promise<CurrenciesResponse> => {
  const response = await fetch(`${FRANKFURTER_API_BASE}/currencies`);
  if (!response.ok) {
    throw new Error('Failed to fetch currencies');
  }
  return response.json();
};

export const useCurrencies = () => {
  return useQuery<CurrenciesResponse, Error>({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: Infinity, // Currencies don't change often
    gcTime: Infinity,
  });
};

// Fetch latest exchange rates for a base currency
const fetchExchangeRates = async (baseCurrency: string, currencies: string[] = []): Promise<ExchangeRatesResponse> => {
  if (!baseCurrency) {
    // Return a default structure or throw an error if baseCurrency is essential
    // For now, let's return a structure that won't break the app if baseCurrency is not yet set
    return { amount: 1, base: '', date: new Date().toISOString().split('T')[0], rates: {} };
  }
  
  let url = `${FRANKFURTER_API_BASE}/latest?from=${baseCurrency}`;
  if (currencies.length > 0) {
    url += `&to=${currencies.join(',')}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates for ${baseCurrency}`);
  }
  return response.json();
};

export const useExchangeRates = (baseCurrency: string, targetCurrencies: string[] = []) => {
  return useQuery<ExchangeRatesResponse, Error>({
    queryKey: ['exchangeRates', baseCurrency, targetCurrencies.sort().join(',')], // Sort targetCurrencies for consistent queryKey
    queryFn: () => fetchExchangeRates(baseCurrency, targetCurrencies),
    enabled: !!baseCurrency, // Only run query if baseCurrency is provided
    refetchInterval: 15 * 60 * 1000, // Auto-refresh every 15 minutes
    staleTime: 5 * 60 * 1000, // Consider rates stale after 5 minutes
  });
};
