import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

export default function ZoneDisplayMap() {
    // TODO: Get list of user's zone polygons & home/work locations
    // Render all shapes on the map
    // Zoom so all shapes are in view
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