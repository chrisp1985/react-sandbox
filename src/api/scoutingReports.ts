export type ScoutingReport = {
  reportId: string;
  playerNo: number;
  status: 'queued' | 'completed';

  result: {
    scouting: {
      playerId: number;
      potential: number;
      report: string;
    };
    analysis: ScoutingAnalysis;
    seniorEvaluation: SeniorScoutingEvaluation | null;
  } | null;

  requestedAt: string;
  completedAt: string | null;
};

export type ReportRequestResponse = {
  reportId: string;
  status: 'queued';
};

export type ScoutingAnalysis = {
  summary: string;
  recommendation: 'promote' | 'retain' | 'release';
  reasons: string[];
};

export type SeniorScoutingEvaluation = {
  summary: string;
  comparisons: {
    metric: 'goalsPer90' | 'shotsPer90';
    observation: string;
  }[];
  limitations: string[];
};

const API_URL = 'http://localhost:8082';

export async function requestScoutingReport(
  playerNo: number,
): Promise<ReportRequestResponse> {
  const response = await fetch(
    `${API_URL}/scouting/${playerNo}/reports`,
    { method: 'POST' },
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function getScoutingReport(
  reportId: string,
): Promise<ScoutingReport> {
  const response = await fetch(
    `${API_URL}/scouting-reports/${reportId}`,
  );

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  return response.json();
}
