import React from 'react';
import { WishList } from '@/types';

const PRESET_THEMES = [
  {
    primaryColor: '#7C3AED',
    backgroundColor: '#F5F3FF',
    name: 'Roxo'
  },
  {
    primaryColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    name: 'Azul'
  },
  {
    primaryColor: '#DC2626',
    backgroundColor: '#FEF2F2',
    name: 'Vermelho'
  },
  {
    primaryColor: '#059669',
    backgroundColor: '#ECFDF5',
    name: 'Verde'
  }
];

interface ThemeSelectorProps {
  value: NonNullable<WishList['theme']>;
  onChange: (theme: NonNullable<WishList['theme']>) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Tema da Lista
      </label>
      <div className="grid grid-cols-4 gap-4">
        {PRESET_THEMES.map((theme) => (
          <button
            key={theme.name}
            type="button"
            onClick={() => onChange(theme)}
            className={`p-4 rounded-lg border-2 transition-all ${
              value.primaryColor === theme.primaryColor
                ? 'border-purple-600 shadow-sm'
                : 'border-transparent hover:border-gray-200'
            }`}
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <div
              className="w-full h-8 rounded-md mb-2"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="text-sm font-medium text-gray-900">
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 