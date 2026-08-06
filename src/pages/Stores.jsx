/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { getCurrentLocation } from "../utils/location";
import { searchStores } from "../api/stores";
import { Map } from "lucide-react";
import StoreSkeleton from "../components/loading/StoreSkeleton";

const WAREHOUSE_LOCATION = {
  lat: 40.723,
  lon: -73.913,
};

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef(null);

  const [search, setSearch] = useState("");

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const [locationSource, setLocationSource] = useState("");

  const [locationLoading, setLocationLoading] = useState(true);

  const [storeLoading, setStoreLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  // Get User Location
  useEffect(() => {
    async function loadLocation() {
      setLocationLoading(true);

      try {
        const location = await getCurrentLocation();

        setLat(location.lat);
        setLon(location.lon);

        setLocationSource("current");
      } catch (error) {
        console.log("Location denied, using warehouse fallback", error);

        setLat(WAREHOUSE_LOCATION.lat);
        setLon(WAREHOUSE_LOCATION.lon);

        setLocationSource("warehouse");
      } finally {
        setLocationLoading(false);
      }
    }

    loadLocation();
  }, []);

  // Load Stores
  async function loadStores(pageNumber = 1, searchText = search) {
    if (!lat || !lon) return;

    try {
      if (pageNumber === 1) {
        setStoreLoading(true);

        setStores([]);

        setPage(1);

        setLastPage(1);
      } else {
        setLoadingMore(true);
      }

      const result = await searchStores(searchText, lat, lon, pageNumber);

      const newStores = Array.isArray(result?.data)
        ? result.data
        : Object.values(result?.data || []);

      console.log("PAGE", pageNumber, "ADDING", newStores.length);

      setStores((prev) => [...prev, ...newStores]);

      setPage(result?.current_page || pageNumber);

      const totalPages = result?.last_page || 1;

      setLastPage(totalPages);

      if (pageNumber >= totalPages) {
        setAllLoaded(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStoreLoading(false);

      setLoadingMore(false);
    }
  }

  useEffect(() => {
    const element = observerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && page < lastPage && !loadingMore) {
          loadStores(page + 1);
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [page, lastPage, loadingMore]);

  // Initial load + location change
  useEffect(() => {
    if (!lat || !lon) return;

    loadStores(1);
  }, [lat, lon]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Stores</h1>

        <p className="text-gray-500">Search and manage stores</p>
      </div>

      {/* Search */}

      <div
        className="
  relative
  w-full
  "
      >
        {/* Search Icon */}

        <div
          className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    text-gray-400
    text-lg
    "
        >
          🔍
        </div>

        <input
          type="text"
          placeholder="Search by Store, City, Owner, Address, Contact No..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            if (value === "") {
              loadStores(1, "");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loadStores();
            }
          }}
          className="
  w-full
  bg-white
  border
  border-gray-200
  rounded-2xl
  pl-12
  pr-28
  py-4
  text-gray-700
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-500
  "
        />

        {/* Clear */}

        {search && (
          <button
            onClick={() => {
              setSearch("");
              loadStores(1, "");
            }}
            className="
        absolute
        right-24
        top-1/2
        -translate-y-1/2

        text-gray-400

        hover:text-gray-700
        mr-5
        cursor-pointer

        "
          >
            ✕
          </button>
        )}

        {/* Search Button */}

        <button
          disabled={storeLoading}
          onClick={loadStores}
          className="
    absolute

    right-2
    top-1/2
    -translate-y-1/2

    bg-blue-600

    hover:bg-blue-700

    text-white

    px-5
    py-2.5

    rounded-xl

    font-medium

    transition
cursor-pointer
    "
        >
          {storeLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Location Badge */}

      <div
        className="
        inline-flex
        bg-blue-50
        text-blue-700
        px-4
        py-2
        rounded-xl
        text-sm
        "
      >
        {locationLoading
          ? "📍 Finding location..."
          : locationSource === "current"
            ? "📍 Using current location"
            : "📍 Using warehouse location (Maspeth, NY)"}
      </div>

      {/* Loading */}

      {(locationLoading || storeLoading) && (
        <div
          className="
          bg-white
          rounded-2xl
          border
          p-8
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
            border-4
            border-blue-200
            border-t-blue-600
            animate-spin
            "
          />

          <div>
            <p className="font-semibold">
              {locationLoading
                ? "Finding your location..."
                : "Loading stores..."}
            </p>

            <p className="text-sm text-gray-500">
              {locationLoading
                ? "Getting nearby stores"
                : "Fetching store information"}
            </p>
          </div>
        </div>
      )}

      {/* Empty */}

      {!locationLoading && !storeLoading && stores.length === 0 && (
        <div
          className="
      bg-white
      rounded-2xl
      border
      p-8
      text-center
      "
        >
          <p className="text-gray-500">No stores found</p>
        </div>
      )}

      {/* Stores */}

      {!locationLoading && !storeLoading && stores.length > 0 && (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
          {stores.map((store) => (
            <div
              key={store.Outlet_ID}
              className="
    bg-white
    rounded-3xl
    border
    overflow-hidden
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
    "
            >
              {/* Header */}

              <div
                className="
      p-5
      flex
      gap-4
      "
              >
                {/* Store Image */}

                <div
                  className="
        w-16
        h-16
        rounded-2xl
        overflow-hidden
        bg-gray-100
        flex-shrink-0
        "
                >
                  {store.Outlet_imge_ln ? (
                    <img
                      src={
                        store.Outlet_imge_ln.startsWith("http")
                          ? store.Outlet_imge_ln
                          : `https://prgspro.sgp1.cdn.digitaloceanspaces.com/${store.Outlet_imge_ln}`
                      }
                      className="
            w-full
            h-full
            object-cover
            "
                    />
                  ) : (
                    <div
                      className="
            w-full
            h-full
            flex
            items-center
            justify-center
            text-2xl
            "
                    >
                      🏪
                    </div>
                  )}
                </div>

                {/* Name */}

                <div className="flex-1">
                  <h2
                    className="
          font-bold
          text-lg
          text-gray-800
          line-clamp-2
          "
                  >
                    {store.Outlet_Name}
                  </h2>

                  <div className="flex gap-2 mt-2">
                    <span
                      className="
            bg-blue-50
            text-blue-700
            px-2
            py-1
            rounded-lg
            text-xs
            "
                    >
                      {store.ShopCategoryName}
                    </span>

                    <span
                      className="
            bg-green-50
            text-green-700
            px-2
            py-1
            rounded-lg
            text-xs
            "
                    >
                      {store.Status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}

              <div
                className="
      px-5
      space-y-3
      text-sm
      "
              >
                <p>
                  👤
                  <span className="ml-2 text-gray-700">
                    {store.Owner_Name || "No owner"}
                  </span>
                </p>

                <p>
                  📞
                  <a
                    href={`tel:${store.Mobile_No}`}
                    className="
          ml-2
          text-blue-600
          hover:underline
          "
                  >
                    {store.Mobile_No}
                  </a>
                </p>

                <p
                  className="
        text-gray-600
        line-clamp-2
        "
                >
                  📍 {store.Outlet_Address}
                </p>
              </div>

              {/* Footer */}

              <div
                className="
      mt-5
      border-t
      px-5
      py-4
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
                    Distance
                  </p>

                  <p
                    className="
          font-bold
          text-green-600
          "
                  >
                    {store.distance_in_km
                      ? `${store.distance_in_km.toFixed(1)} km`
                      : "N/A"}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* Address */}

                  <button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          store.Outlet_Address,
                        )}`,
                        "_blank",
                      );
                    }}
                    className="
  bg-gray-100
  text-gray-700
  p-2.5
  rounded-xl
  hover:bg-gray-200
  transition
  cursor-pointer
  "
                    title="Open address in Google Maps"
                  >
                    <Map size={18} />
                  </button>

                  {/* Directions */}

                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${store.geo_lat},${store.geo_lon}`,
                      )
                    }
                    className="
                    cursor-pointer
    bg-white
  border
  border-gray-200
  text-gray-700
  px-4
  py-2
  rounded-xl
  flex
  items-center
  gap-2
  text-sm
  font-medium
  hover:bg-gray-50
  hover:shadow-sm
  transition
    "
                  >
                    <img
                      src="https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/62c67bbf65af224d417604e5_Google_Maps_Integration_Icon_Bit.svg"
                      className="w-5 h-5"
                      alt=""
                    />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div
            ref={observerRef}
            className="
  col-span-full
  "
          >
            {loadingMore && (
              <div
                className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-5
      w-full
      "
              >
                <StoreSkeleton />
                <StoreSkeleton />
                <StoreSkeleton />
              </div>
            )}

            {!loadingMore && allLoaded && (
              <div
                className="
      text-sm
      text-gray-400
      flex
      items-center
      justify-center
      gap-2
      py-6
      "
              >
                <span>✓</span>
                All stores loaded
              </div>
            )}

            <div ref={observerRef} className="col-span-full h-10" />
          </div>
        </div>
      )}
    </div>
  );
}
