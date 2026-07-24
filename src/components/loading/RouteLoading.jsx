export default function RouteLoading() {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-4
      "
    >
      {[1, 2, 3].map((item) => (
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
          {/* Header */}
          <div
            className="
            flex
            justify-between
            items-center
            mb-5
            "
          >
            <div
              className="
              h-5
              w-32
              rounded
              bg-gray-200
              "
            />

            <div
              className="
              h-6
              w-20
              rounded-full
              bg-gray-200
              "
            />
          </div>

          {/* Route Details */}
          <div className="space-y-4">
            <div
              className="
              flex
              justify-between
              "
            >
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>

            <div
              className="
              flex
              justify-between
              "
            >
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div
              className="
              flex
              justify-between
              "
            >
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>

            <div
              className="
              flex
              justify-between
              "
            >
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
