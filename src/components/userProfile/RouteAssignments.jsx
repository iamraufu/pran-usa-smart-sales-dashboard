import RouteCard from "./RouteCard";
import { Route, MapPin } from "lucide-react";

export default function RouteAssignments({ routes = [], loading, empId }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      p-6
      shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            bg-blue-100
            text-blue-600
            p-3
            rounded-2xl
            "
          >
            <Route size={22} />
          </div>

          <div>
            <h2
              className="
              font-bold
              text-xl
              "
            >
              Route Assignments
            </h2>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Employee assigned sales routes
            </p>
          </div>
        </div>

        <div
          className="
          bg-blue-50
          text-blue-700
          px-4
          py-2
          rounded-xl
          font-semibold
          text-sm
          "
        >
          {routes.length} Routes
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div
          className="
          grid
          md:grid-cols-3
          gap-4
          "
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
              h-48
              bg-gray-100
              rounded-2xl
              animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* Empty */}

      {!loading && routes.length === 0 && (
        <div
          className="
          text-center
          py-10
          "
        >
          <MapPin
            className="
            mx-auto
            text-gray-300
            mb-3
            "
            size={40}
          />

          <p
            className="
            text-gray-500
            "
          >
            No route assigned
          </p>
        </div>
      )}

      {/* Cards */}

      {!loading && routes.length > 0 && (
        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
          {routes.map((route) => (
            <RouteCard key={route.column_id} route={route} empId={empId} />
          ))}
        </div>
      )}
    </div>
  );
}
