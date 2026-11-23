
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  requestScoutingReport,
  getScoutingReport,
} from '../../api/scoutingReports';
import { getPlayers } from '../../api/players';

export function ScoutingReport() {
  const [reportId, setReportId] = useState<string | null>(null);
  const playersQuery = useQuery({
    queryKey: ['players', { limit: 100 }],
    queryFn: () => getPlayers(100),
  });
  const [selectedPlayerNo, setSelectedPlayerNo] = useState<number | null>(null);

  const requestMutation = useMutation({
    mutationFn: (playerNo: number) => requestScoutingReport(playerNo),
    onSuccess: (response) => {
      setReportId(response.reportId);
    },
  });

  const reportQuery = useQuery({
    queryKey: ['scouting-report', reportId],
    queryFn: () => getScoutingReport(reportId!),
    enabled: reportId !== null,
    refetchInterval: (query) => {
      return query.state.data?.status === 'queued'
        ? 2000
        : false;
    },
  });

  return (
    <div>
      <h2>Scouting Report</h2>

      <select
        value={selectedPlayerNo ?? ''}
        onChange={(event) =>
          setSelectedPlayerNo(Number(event.target.value))
        }
      >
        <option value="" disabled>
          Select a player
        </option>

        {playersQuery.data?.data.map((player) => (
          <option key={player.playerNo} value={player.playerNo}>
            {player.name} — {player.club}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          if (selectedPlayerNo === null) return;

          setReportId(null);
          requestMutation.mutate(selectedPlayerNo);
        }}
        disabled={
          selectedPlayerNo === null ||
          requestMutation.isPending
        }
      >
        Generate scouting report
      </button>

      {requestMutation.isPending && <p>Submitting request...</p>}

      {requestMutation.isError && (
        <p>Request failed: {requestMutation.error.message}</p>
      )}

      {reportQuery.isPending && reportId && (
        <p>Loading report...</p>
      )}

      {reportQuery.isError && (
        <p>Failed to fetch report: {reportQuery.error.message}</p>
      )}

      {reportQuery.data?.status === 'queued' && (
        <p>Report queued. Waiting for processing...</p>
      )}

      {reportQuery.data?.status === 'completed' && (
        <div>
          <h3>Completed Report</h3>
          <p>Player: {reportQuery.data.playerNo}</p>
          <p> Recommendation:
            {' '}{reportQuery.data.result?.analysis.recommendation}
          </p>
          <p> Summary:
            {' '}{reportQuery.data.result?.analysis.summary}
          </p>

          <h4>Reasons</h4>
          <ul>
            {reportQuery.data.result?.analysis.reasons.map(
              (reason, index) => (
                <li key={index}>{reason}</li>
              ),
            )}
          </ul>

        {reportQuery.data.result?.seniorEvaluation ? (
        <div>
          <h3>Senior Player Evaluation</h3>

          <p>
            {reportQuery.data.result.seniorEvaluation.summary}
          </p>

          <h4>Statistical Comparisons</h4>
          <ul>
            {reportQuery.data.result.seniorEvaluation.comparisons.map(
              (comparison, index) => (
                <li key={index}>
                  <strong>{comparison.metric}:</strong>{' '}
                  {comparison.observation}
                </li>
              ),
            )}
          </ul>

          <h4>Limitations</h4>
          <ul>
            {reportQuery.data.result.seniorEvaluation.limitations.map(
              (limitation, index) => (
                <li key={index}>{limitation}</li>
              ),
            )}
          </ul>
        </div>) : (
          <p>No senior-player statistical evaluation available.</p>
          )}
        </div>
      )}
    </div>
  );
}
