import React from 'react';

interface PriceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function PriceInput({ value, onChange, ...props }: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const numberValue = rawValue ? parseInt(rawValue) / 100 : undefined;
    onChange(numberValue);
  };

  const formattedValue = value 
    ? new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    : '';

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        R$
      </span>
      <input
        type="text"
        {...props}
        value={formattedValue}
        onChange={handleChange}
        className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      />
    </div>
  );
} 