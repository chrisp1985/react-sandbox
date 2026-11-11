
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  requestScoutingReport,
  getScoutingReport,
} from '../../api/scoutingReports';

export function ScoutingReport() {
  const [reportId, setReportId] = useState<string | null>(null);

  const requestMutation = useMutation({
    mutationFn: () => requestScoutingReport(1),
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

      <button
        onClick={() => {
          setReportId(null);
          requestMutation.mutate();
        }}
        disabled={requestMutation.isPending}
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
          <p>Rating: {reportQuery.data.result?.rating}</p>
          <p>
            Recommendation:
            {' '}{reportQuery.data.result?.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
