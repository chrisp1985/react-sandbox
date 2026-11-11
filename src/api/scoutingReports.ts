export type ScoutingReport = {
  reportId: string;
  playerNo: number;
  status: 'queued' | 'completed';
  result: {
    rating: number;
    playerNo: number;
    recommendation: string;
  } | null;
  requestedAt: string;
  completedAt: string | null;
};

export type ReportRequestResponse = {
  reportId: string;
  status: 'queued';
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
