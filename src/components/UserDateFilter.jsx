export default function UserDateFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
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
        md:flex-row
        gap-5
        "
      >
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
        rounded-lg
        px-3
        py-2
        text-sm
        "
          />
        </div>

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
        rounded-lg
        px-3
        py-2
        text-sm
        "
          />
        </div>
      </div>
    </div>
  );
}
