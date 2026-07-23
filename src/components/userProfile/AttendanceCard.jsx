export default function AttendanceCard({ item }) {
  function formatDate(date) {
    const [year, month, day] = date.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${months[Number(month) - 1]} ${day}, ${year}`;
  }

  return (
    <div
      className="
bg-white
border
rounded-xl
p-4
hover:shadow-sm
transition
"
    >
      <div
        className="
flex
justify-between
items-center
mb-4
"
      >
        <h3
          className="
font-semibold
"
        >
          {formatDate(item.attn_date)}
        </h3>

        <span
          className="
text-xs
bg-green-100
text-green-700
px-3
py-1
rounded-full
"
        >
          Present
        </span>
      </div>

      <div
        className="
space-y-2
text-sm
"
      >
        <p>
          🟢 Check In:
          <span className="font-medium ml-1">{item.ATT_START_TIME}</span>
        </p>

        <p>
          🔴 Check Out:
          <span className="font-medium ml-1">{item.ATT_END_TIME}</span>
        </p>
      </div>
    </div>
  );
}
