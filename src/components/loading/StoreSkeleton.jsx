export default function StoreSkeleton() {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      overflow-hidden
      p-5
      animate-pulse
      "
    >
      {/* Header */}

      <div className="flex gap-4">
        {/* Image */}

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-gray-200
          "
        />

        <div className="flex-1 space-y-3">
          <div
            className="
            h-5
            bg-gray-200
            rounded-lg
            w-3/4
            "
          />

          <div
            className="
            h-4
            bg-gray-200
            rounded-lg
            w-1/3
            "
          />
        </div>
      </div>

      {/* Details */}

      <div className="mt-5 space-y-3">
        <div
          className="
          h-4
          bg-gray-200
          rounded
          w-1/2
          "
        />

        <div
          className="
          h-4
          bg-gray-200
          rounded
          w-2/3
          "
        />

        <div
          className="
          h-10
          bg-gray-200
          rounded-xl
          "
        />
      </div>

      {/* Footer */}

      <div
        className="
        mt-5
        pt-4
        border-t
        flex
        justify-between
        "
      >
        <div
          className="
          h-5
          bg-gray-200
          rounded
          w-20
          "
        />

        <div
          className="
          h-10
          bg-gray-200
          rounded-xl
          w-28
          "
        />
      </div>
    </div>
  );
}
