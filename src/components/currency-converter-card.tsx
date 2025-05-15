"use client";

import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useCurrencies, useExchangeRates } from '@/hooks/use-currency-data';
import { CurrencyInput } from '@/components/currency-input';
import { RateInfo } from '@/components/rate-info';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_FROM_CURRENCY = 'USD';
const DEFAULT_TO_CURRENCY = 'EUR';

export function CurrencyConverterCard() {
  const { toast } = useToast();
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);
  const [amountFrom, setAmountFrom] = useState('1.00');
  const [amountTo, setAmountTo] = useState('');
  const [isTypingFrom, setIsTypingFrom] = useState(true); // true if 'from' field was last typed, false for 'to'

  const { data: currencies, isLoading: isLoadingCurrencies, error: errorCurrencies } = useCurrencies();
  
  // Fetch rates for fromCurrency against toCurrency specifically
  const { 
    data: exchangeRateData, 
    isLoading: isLoadingRates, 
    error: errorRates, 
    refetch: refetchRates,
    isFetching: isFetchingRates 
  } = useExchangeRates(fromCurrency, toCurrency ? [toCurrency] : []);

  // Effect for API errors
  useEffect(() => {
    if (errorCurrencies) {
      toast({ title: "Error", description: "Could not load currencies.", variant: "destructive" });
    }
    if (errorRates) {
      toast({ title: "Error", description: "Could not load exchange rates.", variant: "destructive" });
    }
  }, [errorCurrencies, errorRates, toast]);
  
  const calculateConversion = useCallback(() => {
    if (!exchangeRateData?.rates || !toCurrency || !fromCurrency) {
      if (!isTypingFrom) setAmountFrom(''); else setAmountTo('');
      return;
    }

    const rate = exchangeRateData.rates[toCurrency];
    if (rate === undefined) { // Should not happen if API call is specific enough
       if (!isTypingFrom) setAmountFrom(''); else setAmountTo('');
      return;
    }
    
    const numAmountFrom = parseFloat(amountFrom);
    const numAmountTo = parseFloat(amountTo);

    if (isTypingFrom) {
      if (isNaN(numAmountFrom) || numAmountFrom === 0) {
        setAmountTo('');
        return;
      }
      setAmountTo((numAmountFrom * rate).toFixed(2));
    } else {
      if (isNaN(numAmountTo) || numAmountTo === 0) {
        setAmountFrom('');
        return;
      }
      setAmountFrom((numAmountTo / rate).toFixed(2));
    }
  }, [amountFrom, amountTo, exchangeRateData, toCurrency, fromCurrency, isTypingFrom]);


  useEffect(() => {
    // Debounce or directly call calculation
    if (fromCurrency && toCurrency && (amountFrom || amountTo)) {
       // Only calculate if rates are available
      if (exchangeRateData?.rates?.[toCurrency] !== undefined) {
        calculateConversion();
      } else if (!isLoadingRates && !isFetchingRates && exchangeRateData) { 
        // Rates might be missing for the selected pair, even if data is fetched.
        // This can happen if the initial fetch was for a different pair.
        // Or if the API doesn't support the pair directly.
        // Reset the other amount field.
        if (isTypingFrom) setAmountTo(''); else setAmountFrom('');
      }
    } else {
      // If currencies are not set, or amounts are empty, clear the other field
      if (isTypingFrom) setAmountTo(''); else setAmountFrom('');
    }
  }, [amountFrom, amountTo, fromCurrency, toCurrency, exchangeRateData, calculateConversion, isLoadingRates, isFetchingRates, isTypingFrom]);
  
  // Initialize amountTo when default currencies and amountFrom are set and rates load
  useEffect(() => {
    if (fromCurrency === DEFAULT_FROM_CURRENCY && 
        toCurrency === DEFAULT_TO_CURRENCY && 
        amountFrom === '1.00' && 
        exchangeRateData?.rates?.[toCurrency] &&
        amountTo === '') { // only if amountTo is not already set
      calculateConversion();
    }
  }, [fromCurrency, toCurrency, amountFrom, exchangeRateData, calculateConversion, amountTo]);


  const handleAmountFromChange = (value: string) => {
    setAmountFrom(value);
    setIsTypingFrom(true);
  };

  const handleAmountToChange = (value: string) => {
    setAmountTo(value);
    setIsTypingFrom(false);
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    // Optionally swap amounts or recalculate
    // For simplicity, let's just swap currencies and amounts. The useEffect will recalculate.
    setAmountFrom(amountTo); // This assumes amountTo was the result of a calculation
    setAmountTo(amountFrom); // This assumes amountFrom was the input
    setIsTypingFrom(true); // After swap, assume user might edit 'from' field
  };

  const handleRefreshRates = () => {
    toast({ title: "Refreshing rates...", description: "Fetching the latest exchange rates." });
    refetchRates();
  };

  const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight text-center">
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CurrencyInput
          label="From"
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          amount={amountFrom}
          onAmountChange={handleAmountFromChange}
          isLoadingCurrencies={isLoadingCurrencies}
          isDisabled={isLoadingRates || isFetchingRates}
        />

        <div className="flex justify-center">
          <Button variant="ghost" size="icon" onClick={handleSwapCurrencies} aria-label="Swap currencies">
            <ArrowUpDown className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <CurrencyInput
          label="To"
          currencies={currencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
          amount={amountTo}
          onAmountChange={handleAmountToChange}
          isLoadingCurrencies={isLoadingCurrencies}
          isDisabled={isLoadingRates || isFetchingRates}
        />
        
        <RateInfo
          lastUpdated={exchangeRateData?.date || null}
          onRefresh={handleRefreshRates}
          isRefreshing={isLoadingRates || isFetchingRates}
          isError={!!errorRates}
          isOffline={isOffline && !exchangeRateData?.rates && !isLoadingRates}
        />
      </CardContent>
    </Card>
  );
}
