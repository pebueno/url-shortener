'use client';

import React from 'react';

import { ButtonProps } from './common/types';

export function Button({
  children,
  loading = false,
  loadingText,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'w-full py-2 rounded text-white',
        'bg-purple-600 hover:bg-purple-700',
        'disabled:bg-purple-300',
        className,
      ].join(' ')}
    >
      {loading ? (loadingText ?? children) : children}
    </button>
  );
}
