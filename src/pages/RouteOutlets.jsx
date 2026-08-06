import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Map, Phone, User, Store, ArrowLeft } from "lucide-react";

import { getRouteOutlets } from "../api/routeoutlets";
function getState(address = "") {
  const states = [
    "CT", // Connecticut
    "GA", // Georgia
    "ME", // Maine
    "MD", // Maryland
    "MA", // Massachusetts
    "NH", // New Hampshire
    "NJ", // New Jersey
    "NY", // New York
    "PA", // Pennsylvania
    "RI", // Rhode Island
    "TX", // Texas
    "VT", // Vermont
    "VA", // Virginia
    "WA", // Washington
    "WV", // West Virginia
  ];

  const text = address.toUpperCase();

  const found = states.find((state) => text.includes(` ${state} `));

  return found || "OTHER";
}

export default function RouteOutlets() {
  const location = useLocation();
  const navigate = useNavigate();

  const { route, empId } = location.state || {};

  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStates, setSelectedStates] = useState([]);

  useEffect(() => {
    if (!route || !empId) return;

    loadOutlets();
  }, []);

  async function loadOutlets() {
    try {
      setLoading(true);

      const data = await getRouteOutlets({
        country_id: 42,
        emp_id: empId,
        sr_id: empId,

        route_id: route.Route_ID,

        ou_id: route.OU_ID,

        slgp_id: route.Group_ID,

        new_one: 1,

        is_coworking: 0,

        search: "",
      });

      setOutlets(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!route) {
    return <div className="p-6">No route information found</div>;
  }

  const outletsWithState = outlets.map((outlet) => ({
    ...outlet,
    state: getState(outlet.Outlet_Address),
  }));

  const filteredOutlets = outletsWithState.filter((outlet) => {
    const text = search.toLowerCase();

    const matchesSearch =
      outlet.Outlet_Name?.toLowerCase().includes(text) ||
      outlet.Owner_Name?.toLowerCase().includes(text) ||
      outlet.Outlet_Address?.toLowerCase().includes(text) ||
      outlet.Mobile_No?.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "All" || outlet.outlet_status === statusFilter;

    const matchesState =
      selectedStates.length === 0 || selectedStates.includes(outlet.state);

    return matchesSearch && matchesStatus && matchesState;
  });

  const stateList = [
    "CT", // Connecticut
    "GA", // Georgia
    "ME", // Maine
    "MD", // Maryland
    "MA", // Massachusetts
    "NH", // New Hampshire
    "NJ", // New Jersey
    "NY", // New York
    "PA", // Pennsylvania
    "RI", // Rhode Island
    "TX", // Texas
    "VT", // Vermont
    "VA", // Virginia
    "WA", // Washington
    "WV", // West Virginia
  ];

  const stateCounts = {};

  stateList.forEach((state) => {
    stateCounts[state] = outletsWithState.filter(
      (outlet) => outlet.state === state,
    ).length;
  });

  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
      bg-white
      border
      rounded-3xl
      p-6
      "
      >
        <button
          onClick={() => navigate(-1)}
          className="
        flex
        items-center
        gap-2
        text-gray-600
        mb-4
        "
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex justify-between">
          <div>
            <h1
              className="
            text-2xl
            font-bold
            "
            >
              {route.Route_Name}
            </h1>

            <p
              className="
            text-gray-500
            mt-1
            "
            >
              {route.Base_Name} • {route.Day}
            </p>
          </div>

          <div
            className="
          bg-blue-50
          text-blue-700
          px-4
          py-2
          rounded-xl
          h-fit
          font-semibold
          "
          >
            {outlets.length} Outlets
          </div>
        </div>
      </div>

      <div
        className="
bg-white
border
rounded-3xl
p-5
space-y-5
"
      >
        <div
          className="
flex
justify-between
items-center
"
        >
          <h2
            className="
font-bold
text-xl
"
          >
            Route Outlets
          </h2>

          <button
            onClick={() => {
              const points = filteredOutlets
                .filter((x) => x.geo_lat && x.geo_lon)
                .map((x) => `${x.geo_lat},${x.geo_lon}`)
                .join("/");

              window.open(
                `https://www.google.com/maps/dir/${points}`,
                "_blank",
              );
            }}
            className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
gap-2
items-center
"
          >
            🗺️ View Route Map
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="
Search outlet, owner, address, phone...
"
          className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"
        />

        <div
          className="
flex
gap-3
flex-wrap
"
        >
          {["All", "Active", "Visited", "Dormant", "New"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
px-4
py-2
rounded-full
text-sm
font-medium

${
  statusFilter === status
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-600"
}

`}
            >
              {status}

              {status !== "All" &&
                ` ${outlets.filter((x) => x.outlet_status === status).length}`}
            </button>
          ))}
        </div>
      </div>

      <div
        className="
flex
gap-3
flex-wrap
"
      >
        {stateList.map((state) => (
          <button
            key={state}
            onClick={() => {
              setSelectedStates((prev) =>
                prev.includes(state)
                  ? prev.filter((x) => x !== state)
                  : [...prev, state],
              );
            }}
            className={`
px-4
py-2
rounded-full
text-sm
font-medium

${
  selectedStates.includes(state)
    ? "bg-blue-600 text-white"
    : "bg-blue-50 text-blue-700"
}

`}
          >
            {state}

            <span className="ml-1 text-xs">({stateCounts[state] || 0})</span>
          </button>
        ))}

        {selectedStates.length > 0 && (
          <button
            onClick={() => setSelectedStates([])}
            className="
px-4
py-2
rounded-full
bg-red-50
text-red-600
text-sm
"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading */}

      {loading ? (
        <div
          className="
        bg-white
        rounded-3xl
        p-8
        "
        >
          Loading outlets...
        </div>
      ) : (
        <div
          className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
        "
        >
          {filteredOutlets.map((outlet) => (
            <div
              key={`${outlet.Outlet_ID}-${outlet.Outlet_Code}`}
              className="
bg-white
border
rounded-3xl
p-5
hover:shadow-xl
transition
"
            >
              {/* Header */}

              <div
                className="
flex
justify-between
gap-3
"
              >
                <div>
                  <h2
                    className="
font-bold
text-lg
text-gray-800
"
                  >
                    {outlet.Outlet_Name}
                  </h2>

                  <span className="text-xs text-gray-500">
                    {outlet.Outlet_Code}
                  </span>

                  <p
                    className="
text-sm
text-gray-500
mt-1
"
                  >
                    {outlet.outlet_category_name}
                  </p>
                </div>

                <span
                  className={`
h-0
p-3
rounded-full
flex
items-center content-center
text-xs
font-medium

${
  outlet.outlet_status === "Active"
    ? "bg-green-100 text-green-700"
    : outlet.outlet_status === "Visited"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-700"
}

`}
                >
                  {outlet.outlet_status}
                </span>
              </div>

              {/* Owner */}

              <div
                className="
mt-5
space-y-3
text-sm
"
              >
                <div>
                  <span className="text-gray-400">Owner</span>

                  <p className="font-medium">{outlet.Owner_Name || "N/A"}</p>
                </div>

                <div>
                  <span className="text-gray-400">Phone</span>

                  <p className="font-medium">{outlet.Mobile_No}</p>
                </div>

                <div>
                  <span className="text-gray-400">Address</span>

                  <p
                    className="
text-gray-700
line-clamp-2
"
                  >
                    {outlet.Outlet_Address}
                  </p>
                </div>
              </div>

              {/* Credit Section */}

              <div
                className="
mt-5
bg-gray-50
rounded-2xl
p-4
"
              >
                <h3
                  className="
font-semibold
text-sm
mb-3
"
                >
                  Account Summary
                </h3>

                <div
                  className="
grid
grid-cols-3
gap-3
text-center
"
                >
                  <div>
                    <p
                      className="
text-xs
text-gray-400
"
                    >
                      Credit Limit
                    </p>

                    <p
                      className="
font-bold
text-blue-600
"
                    >
                      ${Number(outlet.Site_Limit || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p
                      className="
text-xs
text-gray-400
"
                    >
                      Credit Used
                    </p>

                    <p
                      className={`
font-bold

${outlet.avail > outlet.Site_Limit ? "text-red-600" : "text-green-600"}

`}
                    >
                      ${Number(outlet.avail || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p
                      className="
text-xs
text-gray-400
"
                    >
                      Balance Due
                    </p>

                    <p
                      className="
font-bold
text-red-600
"
                    >
                      $
                      {Math.max(
                        0,
                        (outlet.avail || 0) - (outlet.Site_Limit || 0),
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Extra Info */}

              <div
                className="
mt-4
flex
justify-between
text-xs
text-gray-500
"
              >
                <span>🌎 {outlet.ethnicity_name || "Unknown"}</span>

                <span>📦 {outlet.Channel}</span>
              </div>

              {/* Footer */}

              <div
                className="
mt-5
border-t
pt-4
flex
justify-between
items-center
"
              >
                <div>
                  <p
                    className="
text-xs
text-gray-400
"
                  >
                    Payment
                  </p>

                  <p
                    className="
font-semibold
"
                  >
                    {outlet.payment_type === 2 ? "Credit" : "Cash"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${outlet.geo_lat},${outlet.geo_lon}`,
                      "_blank",
                    );
                  }}
                  className="
bg-blue-600
text-white
px-4
py-2
rounded-xl
flex
items-center
gap-2
"
                >
                  🗺️ Map
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
