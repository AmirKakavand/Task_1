import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import { useLocations } from "../hooks/useLocations";

export type MapViewProps = {
  center: LatLngExpression;
};

const MapView = ({ center }: MapViewProps) => {
  const { locations, isLoading } = useLocations();
  console.log(locations);
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
      {isLoading ? (
        <Marker position={center}>
          <Tooltip>میدان آزادی</Tooltip>
        </Marker>
      ) : (
        locations?.slice(0, 10).map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Tooltip>{location.name}</Tooltip>
          </Marker>
        ))
      )}
      <MapRefresher center={center} />
    </MapContainer>
  );
};

export default MapView;
