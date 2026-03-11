const API_URL = 'https://data.elexon.co.uk/bmrs/api/v1/balancing/acceptances/all/latest';

export interface Acceptance {
  settlementDate: string;
  settlementPeriodFrom: number;
  settlementPeriodTo: number;
  nationalGridBmUnit: string;
  levelFrom: number;
  levelTo: number;
}

export interface ApiResponse {
  metadata: any;
  data: Acceptance[];
}

export interface ChartData {
  period: string;
  [unit: string]: number | string;
}

function getPeriodLabel(period: number) {
  const hour = Math.floor((period - 1) / 2);
  const min = (period - 1) % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
}

export async function fetchUnitData(): Promise<{
  chartRows: ChartData[];
  units: string[];
  chartDate: string;
}> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Network response was not ok');
  const data: ApiResponse = await res.json();
  const periodMap: Record<string, Record<string, number>> = {};
  const allUnits = new Set<string>();
  data.data.forEach((item) => {
    for (let period = item.settlementPeriodFrom; period <= item.settlementPeriodTo; period++) {
      const periodKey = `${item.settlementDate} P${period}`;
      if (!periodMap[periodKey]) periodMap[periodKey] = {};
      allUnits.add(item.nationalGridBmUnit);
      const contribution = Math.abs(item.levelTo - item.levelFrom);
      periodMap[periodKey][item.nationalGridBmUnit] =
        (periodMap[periodKey][item.nationalGridBmUnit] || 0) + contribution;
    }
  });
  let chartDateLocal = '';
  const chartRows: ChartData[] = Object.entries(periodMap).map(([periodKey, unitMap]) => {
    const [date, periodStr] = periodKey.split(' ');
    chartDateLocal = date;
    const periodNum = parseInt(periodStr.slice(1), 10);
    return {
      period: getPeriodLabel(periodNum),
      ...unitMap,
    };
  });
  chartRows.sort((a, b) => (a.period > b.period ? 1 : -1));
  return {
    chartRows,
    units: Array.from(allUnits),
    chartDate: chartDateLocal,
  };
}