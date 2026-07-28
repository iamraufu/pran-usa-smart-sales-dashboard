/* eslint-disable no-useless-assignment */
export default function TimelineGap({ previousTime, currentTime }) {
  const previous = new Date(previousTime);

  const current = new Date(currentTime);

  const diffMinutes = Math.floor((current - previous) / (1000 * 60));

  const hours = Math.floor(diffMinutes / 60);

  const minutes = diffMinutes % 60;

  let text = "";

  if (hours === 0) {
    text = `${minutes}m later`;
  } else {
    text = `${hours}h ${minutes}m later`;
  }

  let color = "bg-green-100 text-green-700 border-green-200";

  if (diffMinutes > 30) {
    color = "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (diffMinutes > 90) {
    color = "bg-red-100 text-red-700 border-red-200";
  }

  return (
    <div className="flex justify-center">
      <div
        className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          border
          ${color}
        `}
      >
        ⏱ {text}
      </div>
    </div>
  );
}
