import AttendanceCard from "./AttendanceCard";
import ProfileStatCard from "./ProfileStatCard";

export default function Attendance({
  summary,

  details,

  loading
}) {
  return (
    <div className="space-y-6">
      {/* TITLE */}

      <h2
        className="
font-semibold
text-lg
"
      >
        Attendance
      </h2>

      {/* SUMMARY */}

      {loading ? (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4
"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
h-28
rounded-xl
bg-gray-100
animate-pulse
"
            />
          ))}
        </div>
      ) : (
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4
"
        >
          <ProfileStatCard
            icon="📅"
            title="Total Days"
            value={summary?.total_attn_days || 0}
          />

          <ProfileStatCard icon="✅" title="Present" value={details.length} />

          <ProfileStatCard
            icon="🌴"
            title="Leave"
            value={summary?.leave_days || 0}
          />

          <ProfileStatCard
            icon="⏱"
            title="Average Time"
            value={summary?.AVERAGE_ATT_TIME || "-"}
          />
        </div>
      )}

      {/* HISTORY */}

      <div>
        <h3
          className="
font-semibold
mb-4
"
        >
          Attendance History
        </h3>

        {details.length > 0 ? (
          <div
            className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-4
"
          >
            {details.map((item) => (
              <AttendanceCard key={item.attn_date} item={item} />
            ))}
          </div>
        ) : (
          <div
            className="
bg-white
border
rounded-xl
p-5
text-gray-500
"
          >
            No attendance records found
          </div>
        )}
      </div>
    </div>
  );
}
