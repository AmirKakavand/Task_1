import { useEffect, useState } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

const fallbackPosition: Coordinates = {
  lat: 35.6997, // Azadi Square latitude
  lng: 51.3375  // Azadi Square longitude
};

function App() {
  const [position, setPosition] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported, using fallback.");
      setPosition(fallbackPosition);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err: GeolocationPositionError) => {
          alert("Error getting location: " + err.message);
          console.warn("Geolocation error:", err);
          setPosition(fallbackPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, []);

  if (!position) {
    return <p>Loading location...</p>;
  }

  return (
    <div>
      <h1>Your Location:</h1>
      <p>Latitude: {position.lat}</p>
      <p>Longitude: {position.lng}</p>
    </div>
  );
}

export default App;
