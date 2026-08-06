import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useEffect, useState } from "react";

import { getCurrentLocation } from "../utils/location";

import { searchStores } from "../api/stores";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapLoading from "../components/loading/MapLoading";
import CurrentLocationButton from "../components/map/CurrentLocationButton";

const storeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],

  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",

  iconSize: [35, 35],

  iconAnchor: [17, 35],
});

export default function StoreMap() {
  const [stores, setStores] = useState([]);

  const [position, setPosition] = useState(null);
  const [storeLoading, setStoreLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setStoreLoading(true);

        const location = await getCurrentLocation();

        setPosition([location.lat, location.lon]);

        // First page
        const firstPage = await searchStores("", location.lat, location.lon, 1);

        const firstStores = Array.isArray(firstPage?.data)
          ? firstPage.data
          : Object.values(firstPage?.data || {});

        setStores(
          Array.from(
            new Map(
              firstStores.map((store) => [
                `${store.Outlet_Code}-${store.geo_lat}-${store.geo_lon}`,
                store,
              ]),
            ).values(),
          ),
        );

        setStoreLoading(false);

        const totalPages = firstPage?.last_page || 1;

        // Remaining pages in background
        for (let page = 2; page <= totalPages; page++) {
          try {
            const result = await searchStores(
              "",
              location.lat,
              location.lon,
              page,
            );

            const pageStores = Array.isArray(result?.data)
              ? result.data
              : Object.values(result?.data || {});

            setStores((prev) => {
              const combined = [...prev, ...pageStores];

              const unique = Array.from(
                new Map(
                  combined.map((store) => [
                    `${store.Outlet_Code}-${store.geo_lat}-${store.geo_lon}`,
                    store,
                  ]),
                ).values(),
              );

              return unique;
            });
          } catch (error) {
            console.log(`Page ${page} failed`, error);
          }
        }
      } catch (error) {
        console.log(error);

        setStores([]);
        setStoreLoading(false);
      }
    }

    load();
  }, []);

  if (!position || storeLoading) {
    return <MapLoading />;
  }

  return (
    <div
      className="
space-y-5
"
    >
      <div>
        <h1
          className="
text-3xl
font-bold
"
        >
          Store Map
        </h1>

        <p
          className="
text-gray-500
"
        >
          Nearby stores around your location
        </p>
        <p className="text-sm text-gray-500">{stores.length} stores loaded</p>
      </div>

      <div
        className="
h-[650px]
rounded-2xl
overflow-hidden
border
shadow
z-20
"
      >
        <MapContainer
          center={position}
          zoom={12}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="
https://tile.openstreetmap.org/{z}/{x}/{y}.png
"
          />

          {/* Current location */}

          <Marker position={position} icon={userIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>

          {/* Stores */}

          {stores.map((store) => (
            <Marker
              key={`${store.Outlet_Code}-${store.geo_lat}-${store.geo_lon}`}
              position={[store.geo_lat, store.geo_lon]}
              icon={storeIcon}
            >
              <Popup>
                <div
                  className="
  w-64
  space-y-3
  "
                >
                  {/* Header */}

                  <div
                    className="
    border-b
    pb-2
    "
                  >
                    <h3
                      className="
      font-bold
      text-base
      text-gray-800
      "
                    >
                      🏪 {store.Outlet_Name}
                    </h3>

                    <span
                      className="
      inline-block
      mt-1
      bg-blue-100
      text-blue-700
      text-xs
      px-2
      py-1
      rounded-full
      "
                    >
                      {store.ShopCategoryName || "Store"}
                    </span>
                  </div>

                  {/* Details */}

                  <div
                    className="
    text-sm
    space-y-2
    text-gray-600
    "
                  >
                    <p>
                      👤
                      <span className="font-medium text-gray-800 ms-1">
                        Owner:
                      </span>{" "}
                      {store.Owner_Name || "N/A"}
                    </p>

                    <p>
                      📞
                      <span className="font-medium text-gray-800 ms-1">
                        Phone:
                      </span>{" "}
                      {store.Mobile_No || "N/A"}
                    </p>

                    <p>
                      📍
                      <span className="font-medium text-gray-800 ms-1">
                        Distance:
                      </span>{" "}
                      {store.distance_in_km?.toFixed(1)} km
                    </p>

                    <p
                      className="
      leading-5
      "
                    >
                      🏠
                      <span className="font-medium text-gray-800 ms-1">
                        Address:
                      </span>
                      <br />
                      {store.Outlet_Address}
                    </p>
                  </div>

                  {/* Action Buttons */}

                  <div
                    className="
    flex
    gap-2
    pt-2
    "
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${store.geo_lat},${store.geo_lon}`}
                      className="
  flex-1
  text-center
  bg-blue-600
  hover:bg-blue-700
  !text-white
  no-underline
  text-sm
  font-semibold
  py-2
  rounded-xl
  transition
  block
  "
                    >
                      🧭 Directions
                    </a>

                    <a
                      href={`tel:${store.Mobile_No}`}
                      className="
  bg-green-100
  !text-green-700
  no-underline
  px-3
  py-2
  rounded-xl
  "
                    >
                      📞
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <CurrentLocationButton />
        </MapContainer>
      </div>
    </div>
  );
}
