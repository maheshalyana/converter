"use client";

import type { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CurrenciesResponse } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

type CurrencyInputProps = {
  label: string;
  currencies: CurrenciesResponse | undefined;
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  isLoadingCurrencies: boolean;
  isDisabled?: boolean;
};

export function CurrencyInput({
  label,
  currencies,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onAmountChange,
  isLoadingCurrencies,
  isDisabled = false,
}: CurrencyInputProps) {
  
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex space-x-2">
        {isLoadingCurrencies ? (
          <Skeleton className="h-10 w-28 rounded-md" />
        ) : (
          <Select value={selectedCurrency} onValueChange={onCurrencyChange} disabled={isDisabled || isLoadingCurrencies || !currencies}>
            <SelectTrigger className="w-[120px] text-sm" aria-label={`${label} currency select`}>
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies && Object.keys(currencies).sort().map((currencyCode) => (
                <SelectItem key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Input
          id={label.toLowerCase().replace(' ', '-')}
          type="text" // Using text to handle custom validation for numerics
          inputMode="decimal" // Better mobile keyboard
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className="text-xl font-medium h-10 text-right tabular-nums"
          aria-label={`${label} amount`}
          disabled={isDisabled || isLoadingCurrencies || !selectedCurrency}
        />
      </div>
    </div>
  );
}
