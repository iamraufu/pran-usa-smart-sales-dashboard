import { useMap } from "react-leaflet";
import { useState } from "react";
import { LocateFixed } from "lucide-react";

export default function CurrentLocationButton() {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const findLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        map.flyTo([lat, lon], 15, {
          animate: true,
          duration: 1.5,
        });

        setLoading(false);
      },

      () => {
        alert("Unable to get your location");
        setLoading(false);
      },

      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <button
      onClick={findLocation}
      className="
      absolute
      bottom-5
      right-5
      z-[1000]

      bg-white
      shadow-lg
      border
      rounded-full

      w-12
      h-12

      flex
      items-center
      justify-center

      hover:bg-gray-100
      transition
cursor-pointer
      "
      title="Go to my location"
    >
      <LocateFixed
        size={22}
        className={loading ? "animate-spin text-blue-600" : "text-gray-700"}
      />
    </button>
  );
}
