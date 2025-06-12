import { useState, useEffect } from "react";
import MapView from "./components/MapView";

type Coordinates = {
  lat: number;
  lng: number;
};

const fallbackPosition: Coordinates = {
  lat: 35.6997, // Azadi Square
  lng: 51.3375,
};

function App() {
  const [position, setPosition] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition(fallbackPosition);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setPosition(fallbackPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  if (!position) {
    return <p>Loading map...</p>;
  }

  return <MapView center={position} />;
}

export default App;
