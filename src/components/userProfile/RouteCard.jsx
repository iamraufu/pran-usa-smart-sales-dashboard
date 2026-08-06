import {
  CalendarDays,
  MapPin,
  Route as RouteIcon,
  Hash,
  CopyCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RouteCard({ route, empId }) {
  const navigate = useNavigate();
  return (
    <div
      className="
      bg-white
      border
      rounded-3xl
      p-5
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >
      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-start
        "
      >
        <div>
          <h3
            className="
            text-xl
            font-bold
            text-gray-800
            "
          >
            {route.Route_Name}
          </h3>

          <div
            className="
            flex
            gap-2
            mt-3
            "
          >
            <span
              className="
              bg-green-50
              text-green-700
              px-3
              py-1
              rounded-full
              text-xs
              "
            >
              Active
            </span>

            {Number(route.is_mirror) === 1 && (
              <span
                title="Mirror route"
                className="
                bg-purple-50
                text-purple-700
                px-3
                py-1
                rounded-full
                text-xs
                flex
                items-center
                gap-1
                "
              >
                <CopyCheck size={13} />
                Mirror
              </span>
            )}
          </div>
        </div>

        <div
          className="
          bg-blue-100
          text-blue-600
          p-3
          rounded-2xl
          "
        >
          <RouteIcon size={22} />
        </div>
      </div>

      {/* Main Information */}

      <div
        className="
        mt-6
        space-y-4
        "
      >
        <Info
          icon={<MapPin size={18} />}
          label="Territory"
          value={route.Base_Name}
        />

        <Info
          icon={<CalendarDays size={18} />}
          label="Route Day"
          value={route.Day}
        />

        <Info
          icon={<Hash size={18} />}
          label="Route ID"
          value={route.Route_ID}
        />
      </div>

      {/* Footer */}

      <div
        className="
        mt-6
        pt-4
        border-t
        "
      >
        <button
          onClick={() =>
            navigate(`/route/${route.Route_ID}/outlets`, {
              state: {
                route,
                empId,
              },
            })
          }
          className="
          w-full
          bg-gray-900
          text-white
          py-3
          rounded-xl
          hover:bg-gray-800
          transition
          font-medium
          "
        >
          View Route
        </button>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      "
    >
      <div
        className="
        bg-gray-100
        p-2
        rounded-xl
        text-gray-500
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
          text-xs
          text-gray-400
          "
        >
          {label}
        </p>

        <p
          className="
          font-semibold
          text-gray-700
          "
        >
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}
