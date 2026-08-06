export default function MapLoading() {
  return (
    <div
      className="
      h-[650px]
      rounded-2xl
      overflow-hidden
      border
      shadow-sm
      relative
      bg-gray-100
      "
    >
      {/* Fake map background */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-gray-100
        via-gray-200
        to-gray-100
        animate-pulse
        "
      />

      {/* Fake roads */}

      <div
        className="
        absolute
        top-24
        left-0
        w-full
        h-6
        bg-white/70
        rotate-12
        "
      />

      <div
        className="
        absolute
        top-64
        left-[-50px]
        w-[120%]
        h-5
        bg-white/70
        -rotate-6
        "
      />

      <div
        className="
        absolute
        right-20
        top-10
        w-5
        h-[90%]
        bg-white/70
        rotate-12
        "
      />

      {/* Location pulse */}

      <div
        className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
          relative
          "
        >
          <div
            className="
            absolute
            -inset-5
            rounded-full
            bg-blue-400/30
            animate-ping
            "
          />

          <div
            className="
            relative
            w-14
            h-14
            rounded-full
            bg-blue-600
            border-4
            border-white
            shadow-xl
            flex
            items-center
            justify-center
            text-2xl
            "
          >
            📍
          </div>
        </div>
      </div>

      {/* Bottom loading card */}

      <div
        className="
        absolute
        bottom-5
        left-5
        right-5
        bg-white
        rounded-2xl
        p-5
        shadow-lg
        "
      >
        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <div
            className="
            w-10
            h-10
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            "
          >
            🏪
          </div>

          <div>
            <p
              className="
              font-semibold
              text-gray-800
              "
            >
              Finding nearby stores
            </p>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Preparing your store map...
            </p>
          </div>
        </div>

        <div
          className="
          mt-4
          h-2
          rounded-full
          bg-gray-200
          overflow-hidden
          "
        >
          <div
            className="
            h-full
            w-1/2
            bg-blue-500
            rounded-full
            animate-[loading_1.5s_infinite]
            "
          />
        </div>
      </div>
    </div>
  );
}
