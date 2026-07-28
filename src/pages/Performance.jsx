import { useEffect, useState } from "react";

import PerformanceHeader from "../components/performance/PerformanceHeader";

import PerformanceFilter from "../components/performance/PerformanceFilter";

import PerformanceSummary from "../components/performance/PerformanceSummary";

import Leaderboard from "../components/performance/Leaderboard";

import PerformanceLoading from "../components/performance/PerformanceLoading";
import { getLeaderboard } from "../services/performanceService";
export default function Performance() {
  const today = new Date().toLocaleDateString("en-CA");

  const [startDate, setStartDate] = useState(today);

  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(true);

  const [performance, setPerformance] = useState([]);
  const [sortBy, setSortBy] = useState("sales");

  const sortedData = [...performance].sort(
    (a, b) => (b[sortBy] || 0) - (a[sortBy] || 0),
  );

  useEffect(() => {
    async function loadPerformance() {
      try {
        setLoading(true);

        const results = await getLeaderboard(startDate, endDate);

        setPerformance(results);
      } finally {
        setLoading(false);
      }
    }

    loadPerformance();
  }, [startDate, endDate]);

  return (
    <div className="space-y-8">
      <PerformanceHeader />

      <PerformanceFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <PerformanceLoading />
      ) : (
        <>
          <PerformanceSummary data={performance} />

          <Leaderboard data={sortedData} />
        </>
      )}
    </div>
  );
}
