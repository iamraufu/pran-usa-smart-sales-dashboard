import users from "../../data/users";
import { getUserDashboard } from "../api/dashboard";

export async function getLeaderboard(startDate, endDate) {
  const salesReps = users.filter(
    (user) => user.username && user.username.toUpperCase().startsWith("SALES"),
  );

  const results = await Promise.all(
    salesReps.map(async (user) => {
      try {
        const data = await getUserDashboard(user.emp_id, startDate, endDate);

        const summary = data.visit_summery;

        return {
          emp_id: user.emp_id,
          username: user.username,
          name: user.name,

          sales: Number(summary?.totalOrderAmount || 0),

          orders: Number(summary?.totalOrder || 0),

          visits: Number(summary?.totalVisited || 0),

          strikeRate: Number(summary?.strikeRatePercent || 0),

          visitPercent: Number(summary?.visitPercent || 0),

          totalSite: Number(summary?.totalSite || 0),
        };
      } catch {
        return null;
      }
    }),
  );

  return results.filter(Boolean).sort((a, b) => b.sales - a.sales);
}
