import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { LatLngExpression } from "leaflet";
import { useLocations } from "../hooks/useLocations";

export type MapViewProps = {
  center: LatLngExpression;
};

const MapView = ({ center }: MapViewProps) => {
  const { locations, isLoading } = useLocations();
  console.log(locations)
  const MapRefresher = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(center);
      map.invalidateSize();
    }, [map, center]);

    return null;
  };
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>You are here (or somewhere close enough)</Popup>
      </Marker>
      <MapRefresher center={center} />
      {!isLoading &&
        locations?.slice(0, 10).map((loc: any) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))
      }
    </MapContainer>
  );
};

export default MapView;
