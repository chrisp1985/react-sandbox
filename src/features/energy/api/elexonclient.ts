const PERIOD_URL = (date: string, period: number) =>
  `https://data.elexon.co.uk/bmrs/api/v1/balancing/settlement/acceptances/all/${date}/${period}`;

export interface SettlementAcceptance {
  settlementDate: string;
  settlementPeriod: number;
  bmUnit: string;
  nationalGridBmUnit: string;
  acceptanceNumber: number;
  acceptanceTime: string;
  bidPrice: number;
  offerPrice: number;
  bidOfferPairId: number;
}

export interface PeriodSummary {
  period: string;
  avgOfferPrice: number;
  avgBidPrice: number;
  acceptanceCount: number;
  activeUnits: number;
}

export interface UnitActivity {
  unit: string;
  acceptanceCount: number;
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getPeriodLabel(period: number) {
  const hour = Math.floor((period - 1) / 2);
  const min = (period - 1) % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
}

export async function fetchFullDayData(date?: Date): Promise<{
  periodSummaries: PeriodSummary[];
  unitActivities: UnitActivity[];
  settlementDate: string;
}> {
  const target = date ?? (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d; })();
  const dateStr = toDateString(target);

  const results = await Promise.allSettled(
    Array.from({ length: 48 }, (_, i) =>
      fetch(PERIOD_URL(dateStr, i + 1))
        .then((r) => (r.ok ? r.json() : { data: [] }))
        .then((json) => (json.data ?? []) as SettlementAcceptance[])
    )
  );

  const all: SettlementAcceptance[] = results.flatMap((r) =>
    r.status === 'fulfilled' ? r.value : []
  );

  const byPeriod: Record<number, SettlementAcceptance[]> = {};
  all.forEach((acc) => {
    (byPeriod[acc.settlementPeriod] ??= []).push(acc);
  });

  const periodSummaries: PeriodSummary[] = Array.from({ length: 48 }, (_, i) => i + 1)
    .filter((p) => byPeriod[p]?.length)
    .map((p) => {
      const items = byPeriod[p];
      const avg = (key: 'offerPrice' | 'bidPrice') => {
        const vals = items.map((a) => a[key]).filter((v) => v != null);
        return vals.length ? parseFloat((vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(2)) : 0;
      };
      return {
        period: getPeriodLabel(p),
        avgOfferPrice: avg('offerPrice'),
        avgBidPrice: avg('bidPrice'),
        acceptanceCount: items.length,
        activeUnits: new Set(items.map((a) => a.nationalGridBmUnit)).size,
      };
    });

  const unitMap: Record<string, number> = {};
  all.forEach((acc) => { unitMap[acc.nationalGridBmUnit] = (unitMap[acc.nationalGridBmUnit] ?? 0) + 1; });
  const unitActivities: UnitActivity[] = Object.entries(unitMap)
    .map(([unit, acceptanceCount]) => ({ unit, acceptanceCount }))
    .sort((a, b) => b.acceptanceCount - a.acceptanceCount);

  return { periodSummaries, unitActivities, settlementDate: dateStr };
}
