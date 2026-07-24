
export default function PerformanceLoading() {
  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
    >
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            bg-white
            border
            rounded-2xl
            p-5
            animate-pulse
          "
        >
          <div className="h-10 w-10 bg-gray-200 rounded-xl mb-4" />

          <div className="h-8 w-24 bg-gray-200 rounded mb-3" />

          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}