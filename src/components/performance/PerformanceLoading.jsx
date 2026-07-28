export default function PerformanceLoading() {
  return (
    <div
      className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="
h-48
bg-gray-200
rounded-2xl
animate-pulse
"
        />
      ))}
    </div>
  );
}
