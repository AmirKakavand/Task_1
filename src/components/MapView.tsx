import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { MapContainer, TileLayer, Marker, useMap, Tooltip } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import { useLocations } from "../hooks/useLocations";

// Create a custom default icon using the imported URLs
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_TOOLTIP_TEXT = "میدان آزادی";

type MapViewProps = {
  center: LatLngExpression;
};

const MapRefresher = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
    map.invalidateSize();
  }, [map, center]);

  return null;
};

const MapView = ({ center }: MapViewProps) => {
  const { locations, isLoading } = useLocations();

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
          <Tooltip>{DEFAULT_TOOLTIP_TEXT}</Tooltip>
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
