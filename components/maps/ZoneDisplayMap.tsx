import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

export default function ZoneDisplayMap() {
    return (
    <MapContainer
        center={[51.505, -0.09] as L.LatLngExpression}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "400px" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    )
}