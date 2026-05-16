import type { ReactNode } from 'react';

export type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
