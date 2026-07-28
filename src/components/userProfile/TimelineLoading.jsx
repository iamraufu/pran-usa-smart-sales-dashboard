export default function TimelineLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="
          bg-white
          border
          rounded-2xl
          p-5
          animate-pulse
          "
        >
          <div className="flex gap-4">
            <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>

            <div className="flex-1 space-y-3">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>

              <div className="h-3 w-64 bg-gray-200 rounded"></div>

              <div className="h-3 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
