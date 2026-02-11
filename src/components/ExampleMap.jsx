import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle
} from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (Leaflet quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

export default function RunTrackerMap() {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Watch GPS location in real time
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setPosition(newPos);
        setRoute((prev) => [...prev, newPos]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return <p>Getting your GPS location...</p>;

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
    >
		<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution="&copy; OpenStreetMap contributors"
		/>

		{/* User's current location */}
		<Circle
			center={position}
			radius={6}
			color="blue"
			fillColor="blue"
			fillOpacity={1}
		/>

		<Circle
			center={position}
			radius={12}
			color="blue"
		/>

		{/* Route polyline */}
		<Polyline positions={route} color="blue" weight={5} />
		
    </MapContainer>
  );
}