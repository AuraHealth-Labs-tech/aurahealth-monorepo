import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles =
    'rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500';
  const variantStyles =
    variant === 'secondary'
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
      : 'bg-teal-600 text-white hover:bg-teal-700';

  return <button className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
