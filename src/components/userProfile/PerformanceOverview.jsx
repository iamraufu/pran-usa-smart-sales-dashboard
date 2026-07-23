import ProfileStatCard from "./ProfileStatCard";

export default function PerformanceOverview({ summary, loading }) {
  if (loading) {
    return (
      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="
            h-28
            bg-gray-100
            rounded-xl
            animate-pulse
          "
          />
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const current = Number(summary.totalOrderAmount) || 0;

  const previous = Number(summary.prevTotalOrderAmount) || 0;

  const growth =
    previous > 0 ? (((current - previous) / previous) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4">
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <h2
          className="
          text-lg
          font-semibold
          text-gray-800
        "
        >
          Performance Overview
        </h2>
      </div>

      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
      >
        <ProfileStatCard
          icon="🎯"
          title="Strike Rate"
          value={`${summary.strikeRatePercent}%`}
        />

        <ProfileStatCard
          icon="🚗"
          title="Visit Rate"
          value={`${summary.visitPercent}%`}
        />

        <ProfileStatCard icon="🛒" title="Orders" value={summary.totalOrder} />

        <ProfileStatCard
          icon="💰"
          title="Sales"
          value={`$${current.toFixed(2)}`}
        />

        <ProfileStatCard icon="🏪" title="Stores" value={summary.totalSite} />

        <ProfileStatCard
          icon="📍"
          title="Visits"
          value={summary.totalVisited}
        />

        <ProfileStatCard
          icon="📦"
          title="SKU Lines"
          value={summary.numberItemLine}
        />

        <ProfileStatCard
          icon="📊"
          title="Line / Call"
          value={summary.lineParCall}
        />
      </div>

      <div
        className="
        bg-white
        border
        rounded-xl
        p-5
      "
      >
        <div
          className="
          flex
          justify-between
          items-center
        "
        >
          <div>
            <p
              className="
              text-sm
              text-gray-500
            "
            >
              Sales Growth
            </p>

            <h3
              className="
              text-2xl
              font-bold
              mt-1
            "
            >
              {growth > 0 ? "+" : ""}
              {growth}%
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Current</p>

            <p className="font-semibold">${(current.toFixed(2)*1000).toLocaleString('en-US')}</p>

            <p className="text-sm text-gray-500 mt-2">Previous</p>

            <p className="font-semibold">${(previous.toFixed(2)*1000).toLocaleString('en-US')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
