'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const formatCurrency = (value: string) => {
  // Basic formatting to keep the input experience clean.
  return value.replace(/[^0-9.]/g, '');
};

export default function HomePage() {
  const [cashOnHand, setCashOnHand] = useState('');
  const [monthlyBurn, setMonthlyBurn] = useState('');

  const runway = useMemo(() => {
    const burn = parseFloat(monthlyBurn);
    const cash = parseFloat(cashOnHand);

    if (!monthlyBurn || burn <= 0 || Number.isNaN(burn)) {
      return null;
    }

    if (Number.isNaN(cash) || cash < 0) {
      return null;
    }

    // Real-time runway calculation, rounded to one decimal place.
    return Math.round((cash / burn) * 10) / 10;
  }, [cashOnHand, monthlyBurn]);

  const status = useMemo(() => {
    if (runway === null) {
      return null;
    }

    if (runway < 3) {
      return { label: 'Urgent', color: 'bg-red-100 text-red-700', icon: AlertTriangle };
    }

    if (runway < 6) {
      return { label: 'Warning', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle };
    }

    return { label: 'Safe', color: 'bg-emerald-100 text-emerald-700', icon: ShieldCheck };
  }, [runway]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Founder’s Runway</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Monthly runway calculator
          </h1>
          <p className="mt-3 text-slate-400">
            Enter your cash and burn rate to see how many months of runway your startup has left.
          </p>
        </div>

        <div className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Total Cash on Hand</span>
            <input
              value={cashOnHand}
              onChange={(event) => setCashOnHand(formatCurrency(event.target.value))}
              placeholder="e.g. 120000"
              inputMode="decimal"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-lg text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Monthly Burn Rate</span>
            <input
              value={monthlyBurn}
              onChange={(event) => setMonthlyBurn(formatCurrency(event.target.value))}
              placeholder="e.g. 20000"
              inputMode="decimal"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-lg text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            />
          </label>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Projected runway</p>
                <p className="mt-3 text-5xl font-semibold text-white">
                  {runway === null ? '—' : `${runway} months`}
                </p>
              </div>
              <div className="shrink-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                {status ? (
                  <status.icon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <ShieldCheck className="h-6 w-6 text-slate-400" aria-hidden="true" />
                )}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300">
              {monthlyBurn === '' || parseFloat(monthlyBurn) <= 0 ? (
                <p className="text-amber-200">Enter valid burn rate to calculate runway.</p>
              ) : runway === null ? (
                <p>Enter cash and burn values to see the runway.</p>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    Status: <span className={status?.color ?? 'text-slate-300'}>{status?.label}</span>
                  </p>
                  <p className="text-slate-400">Runway is calculated as Cash ÷ Burn.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
