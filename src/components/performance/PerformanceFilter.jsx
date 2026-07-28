export default function PerformanceFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy,
}) {
  return (
    <div
      className="
      bg-white
      border
      rounded-2xl
      p-5
      "
    >
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        gap-5
        "
      >
        {/* Start Date */}
        <div>
          <label
            className="
            block
            text-xs
            text-gray-500
            mb-1
            "
          >
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="
            border
            rounded-xl
            px-3
            py-2
            text-sm
            "
          />
        </div>

        {/* End Date */}
        <div>
          <label
            className="
            block
            text-xs
            text-gray-500
            mb-1
            "
          >
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="
            border
            rounded-xl
            px-3
            py-2
            text-sm
            "
          />
        </div>

        {/* Sort */}
        <div className="flex-1">
          <label
            className="
            block
            text-xs
            text-gray-500
            mb-1
            "
          >
            Ranking By
          </label>

          <div className="flex flex-wrap gap-2">
            {[
              {
                key: "sales",
                label: "💰 Sales",
              },
              {
                key: "orders",
                label: "📦 Orders",
              },
              {
                key: "visits",
                label: "🏪 Visits",
              },
              {
                key: "strikeRate",
                label: "🎯 Strike Rate",
              },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSortBy(item.key)}
                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition

                  ${
                    sortBy === item.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
