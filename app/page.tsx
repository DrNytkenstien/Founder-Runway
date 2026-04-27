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
      return {
        label: 'Urgent',
        badgeClass: 'bg-red-100 text-red-700',
        numberClass: 'text-red-400',
        cardBg: 'bg-red-950/95',
        innerBg: 'bg-red-950/85',
        inputFocus: 'focus:border-red-400 focus:ring-2 focus:ring-red-500/20',
        iconColor: 'text-red-400',
        gradient: 'radial-gradient(circle_at_top, rgba(239,68,68,0.14), transparent 36%)',
        pulse: true,
        icon: AlertTriangle,
      };
    }

    if (runway < 6) {
      return {
        label: 'Warning',
        badgeClass: 'bg-yellow-100 text-yellow-700',
        numberClass: 'text-amber-300',
        cardBg: 'bg-amber-950/95',
        innerBg: 'bg-amber-950/85',
        inputFocus: 'focus:border-amber-400 focus:ring-2 focus:ring-yellow-500/20',
        iconColor: 'text-amber-300',
        gradient: 'radial-gradient(circle_at_top, rgba(245,158,11,0.14), transparent 36%)',
        pulse: false,
        icon: AlertTriangle,
      };
    }

    return {
      label: 'Safe',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      numberClass: 'text-emerald-300',
      cardBg: 'bg-emerald-950/95',
      innerBg: 'bg-emerald-950/85',
      inputFocus: 'focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20',
      iconColor: 'text-emerald-300',
      gradient: 'radial-gradient(circle_at_top, rgba(16,185,129,0.14), transparent 36%)',
      pulse: false,
      icon: ShieldCheck,
    };
  }, [runway]);

  const estimatedZeroCashDate = useMemo(() => {
    if (runway === null || !Number.isFinite(runway)) {
      return null;
    }

    const today = new Date();
    const daysToZero = runway * 30.436875; // average month length
    const zeroDate = new Date(today.getTime() + daysToZero * 24 * 60 * 60 * 1000);

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(zeroDate);
  }, [runway]);

  const focusClasses = status?.inputFocus ?? 'focus:border-slate-500 focus:ring-2 focus:ring-slate-500/15';
  const wrapperStyle = status ? { backgroundImage: status.gradient, backgroundRepeat: 'no-repeat', backgroundPosition: 'top center' } : undefined;
  const cardBgClasses = status?.cardBg ?? 'bg-slate-900/95';

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100" style={wrapperStyle}>
      <div
        className={`mx-auto w-full max-w-xl rounded-3xl border border-slate-800 ${cardBgClasses} p-8 shadow-2xl shadow-slate-950/20 sm:p-10 ${status?.pulse ? 'animate-pulse' : ''}`}
      >
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
              className={`w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-lg text-white outline-none transition ${focusClasses}`}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Monthly Burn Rate</span>
            <input
              value={monthlyBurn}
              onChange={(event) => setMonthlyBurn(formatCurrency(event.target.value))}
              placeholder="e.g. 20000"
              inputMode="decimal"
              className={`w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-lg text-white outline-none transition ${focusClasses}`}
            />
          </label>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Projected runway</p>
                <div>
                  <p className={`mt-3 text-5xl font-semibold ${status?.numberClass ?? 'text-white'}`}>
                    {runway === null ? '—' : `${runway} months`}
                  </p>
                  {estimatedZeroCashDate ? (
                    <p className={`mt-3 text-sm ${status?.numberClass ?? 'text-slate-300'}`}>
                      Estimated Zero-Cash Date: {estimatedZeroCashDate}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="shrink-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                {status ? (
                  <status.icon className={`h-6 w-6 ${status.iconColor}`} aria-hidden="true" />
                ) : (
                  <ShieldCheck className="h-6 w-6 text-slate-400" aria-hidden="true" />
                )}
              </div>
            </div>

            <div className={`mt-6 rounded-3xl border border-slate-800 ${status?.innerBg ?? 'bg-slate-950/90'} p-4 text-sm text-slate-300`}>
              {monthlyBurn === '' || parseFloat(monthlyBurn) <= 0 ? (
                <p className="text-amber-200">Enter valid burn rate to calculate runway.</p>
              ) : runway === null ? (
                <p>Enter cash and burn values to see the runway.</p>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    Status: <span className={status?.badgeClass ?? 'text-slate-300'}>{status?.label ?? 'Unknown'}</span>
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
