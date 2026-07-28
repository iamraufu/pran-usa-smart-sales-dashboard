import { useState } from "react";

export default function TimelineCard({ item, previous }) {
  const [showImage, setShowImage] = useState(false);

  function getGap() {
    if (!previous) return null;

    const current = new Date(item.created_at);

    const old = new Date(previous.created_at);

    const diff = Math.floor((current - old) / 1000 / 60);

    const hours = Math.floor(diff / 60);

    const minutes = diff % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }

  function getTypeStyle() {
    if (item.location_type === "order") {
      return "bg-green-100 text-green-700";
    }

    if (item.location_type === "visit") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-purple-100 text-purple-700";
  }

  function getIcon() {
    if (item.location_type === "order") {
      return "🛒";
    }

    if (item.location_type === "visit") {
      return "🏪";
    }

    return "🟢";
  }

  function getTime() {
    return new Date(item.created_at).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatOrderAmount(amount) {
    if (!amount) return "";

    const number = Number(amount);

    return `$${(number * 1000).toLocaleString(
      "en-US",
    )}`;
  }

  return (
    <div
      className="
      relative
      pl-8
      "
    >
      {/* Timeline dot */}

      <div
        className="
        absolute
        -left-[9px]
        top-6
        w-4
        h-4
        rounded-full
        bg-blue-600
        border-4
        border-white
        shadow
        "
      />

      {/* GAP */}

      {getGap() && (
        <div
          className="
          text-xs
          text-gray-400
          mb-3
          "
        >
          ⏱ {getGap()} later
        </div>
      )}

      {/* CARD */}

      <div
        className="
  bg-white
  border
  rounded-2xl
  overflow-hidden
  hover:shadow-lg
  transition
  "
      >
        <div
          className="
    md:flex
    block
    gap-4
    p-4
    "
        >
          {/* IMAGE LEFT */}

          {item.image && (
            <div
              onClick={() => setShowImage(true)}
              className="
        w-32
        h-32
        md:w-40
        md:h-40
        rounded-xl
        overflow-hidden
        cursor-pointer
        shrink-0
        bg-gray-100
        relative
        "
            >
              <img
                src={item.image}
                alt=""
                className="
          w-full
          h-full
          object-cover
          hover:scale-105
          transition
          duration-300
          
          "
              />

              {/* IMAGE ICON */}

              <div
                className="
          absolute
          bottom-2
          left-2
          bg-black/60
          text-white
          px-2
          py-1
          rounded-full
          text-[10px]
          "
              >
                {getIcon()}
              </div>
            </div>
          )}

          {/* CONTENT RIGHT */}

          <div
            className="
      flex-1
      mt-5
      md:m-0
      "
          >
            <div
              className="
        flex
        justify-between
        items-center
        gap-2
        "
            >
              <span
                className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          ${getTypeStyle()}
          `}
              >
                {item.location_type.toUpperCase()}
              </span>

              <span
                className="
          text-xs
          md:text-sm
          text-gray-500
          "
              >
                {getTime()}
              </span>
            </div>

            {/* Outlet */}

            {item.outlet_name && (
              <h3
                className="
          font-semibold
          text-gray-800
          mt-3
          text-sm
          "
              >
                🏪 {item.outlet_name}
              </h3>
            )}

            {/* Details */}

            <div
              className="
  mt-2
  space-y-2
  "
            >
              {/* Activity Time */}

              {item.details && (
                <p
                  className="
      text-sm
      text-gray-600
      whitespace-pre-line
      "
                >
                  🕒 {item.details}
                </p>
              )}

              {/* Visit / Order Remark */}

              {item.msg_detail && (
                <div
                  className={`
      rounded-lg
      px-3
      py-2
      text-xs
      ${
        item.location_type === "order"
          ? "bg-green-50 text-green-700"
          : "bg-blue-50 text-blue-700"
      }
      `}
                >
                  {item.location_type === "visit" && "📝 "}
                  {item.location_type === "order" && "💬 "}

                  {item.msg_detail}
                </div>
              )}
            </div>

            {/* Order Amount */}

            {item.location_type === "order" && (
              <div
                className="
    mt-3
    bg-green-50
    text-green-700
    rounded-xl
    p-2
    text-sm
    font-semibold
    "
              >
                💰 {formatOrderAmount(item.msg_detail?.replace(/[^0-9.]/g, ""))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}

      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="
          fixed
          inset-0
          z-50
          bg-black/80
          flex
          items-center
          justify-center
          p-5
          "
        >
          <img
            src={item.image}
            alt=""
            className="
            max-h-[90vh]
            max-w-[95vw]
            rounded-2xl
            shadow-2xl
            "
          />
        </div>
      )}
    </div>
  );
}
