export default function AttendanceLoading() {
  return (
    <div className="space-y-5">
      {/* Summary Cards Loading */}
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
            <div
              className="
              h-10
              w-10
              rounded-xl
              bg-gray-200
              mb-4
              "
            />

            <div
              className="
              h-4
              w-24
              rounded
              bg-gray-200
              mb-3
              "
            />

            <div
              className="
              h-8
              w-16
              rounded
              bg-gray-200
              "
            />
          </div>
        ))}
      </div>

      {/* Attendance History Loading */}
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
            <div
              className="
              flex
              justify-between
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

            <div className="space-y-3">
              <div
                className="
                h-4
                w-40
                rounded
                bg-gray-200
                "
              />

              <div
                className="
                h-4
                w-40
                rounded
                bg-gray-200
                "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
