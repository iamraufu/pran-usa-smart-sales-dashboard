import TimelineCard from "./TimelineCard";
import TimelineLoading from "./TimelineLoading";

export default function Timeline({ loading, data }) {
  return (
    <div>
      <div
        className="
      flex
      justify-between
      mb-5
      "
      >
        <h2
          className="
        font-semibold
        text-lg
        "
        >
          Activity Timeline
        </h2>

        <span
          className="
        text-sm
        text-gray-500
        "
        >
          {data.length} Activities
        </span>
      </div>

      {loading ? (
        <TimelineLoading />
      ) : (
        <div
          className="
        relative
        border-l-2
        border-gray-200
        ml-4
        space-y-8
        "
        >
          {data.map((item, index) => (
            <TimelineCard
              key={item.timeline_id}
              item={item}
              previous={data[index - 1]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
